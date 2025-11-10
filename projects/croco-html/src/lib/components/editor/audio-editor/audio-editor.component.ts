import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AudioMethods, FileAudioTagDataConsts } from '../../../extensions/AudioMethods';
import { HtmlBodyTag } from '../../../models/models';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { Subject, takeUntil } from "rxjs";
import { PublicFilesQueryService } from '../../../services/PublicFilesQueryService';
import { PrivateFilesQueryService } from '../../../services/PrivateFilesQueryService';
import { CrocoHtmlFileOptionsService } from '../../../services/CrocoHtmlFileOptionsService';
import { FileType } from '../../../services/file-models';
import { UploadFilesBtnComponent } from '../../upload-files-btn/upload-files-btn.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatIconButton} from "@angular/material/button";
import { CommonFileInfoQueryService } from '../../../services/CommonFileInfoQueryService';

@Component({
  selector: 'croco-html-audio-editor',
  templateUrl: './audio-editor.component.html',
  styleUrls: ['./audio-editor.component.scss'],
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    UploadFilesBtnComponent,
    NgSelectModule,
    MatIconButton
  ]
})
export class AudioEditorComponent implements OnInit, OnDestroy {

  hasAudioError = false;
  errorMessage = '';
  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  isMuted = false;
  audioSrc = '';

  searchOrEdit = "search";

  files: Array<{ fileId: string; fileName: string }> = [];
  loading = false;
  q = '';

  private unsubscribe = new Subject<void>();

  @ViewChild('audioPlayer', { static: false })
  audioPlayer!: ElementRef<HTMLAudioElement>;

  @Input({ required: true })
  tag: HtmlBodyTag;

  @Input({ required: true })
  presentOrEdit = true;

  constructor(
    private readonly _publicFileService: PublicFilesQueryService,
    private readonly _privateFileService: PrivateFilesQueryService,
    private readonly _htmlSettingsService: CrocoHtmlFileOptionsService,
    private readonly _commonFileInfoService: CommonFileInfoQueryService,
  ) { }

  public get fileId(): string {
    return this.tag.attributes[FileAudioTagDataConsts.FileIdAttrName];
  }

  public set fileId(value: string) {
    this.tag.attributes[FileAudioTagDataConsts.FileIdAttrName] = value;
  }

  public get title(): string {
    return this.tag.attributes[FileAudioTagDataConsts.TitleAttrName] || '';
  }

  public set title(value: string) {
    this.tag.attributes[FileAudioTagDataConsts.TitleAttrName] = value;
  }

  hasFileId() {
    return this.tag.attributes.hasOwnProperty(FileAudioTagDataConsts.FileIdAttrName) && this.fileId && this.fileId !== '';
  }

  private get audioElement(): HTMLAudioElement | null {
    return this.audioPlayer?.nativeElement || null;
  }

  onErrorHandler() {
    this.hasAudioError = true;
    this.isLoading = false;
    if (!this.errorMessage) {
      this.errorMessage = 'Аудио-файл не найден по указанному идентификатору, возможно файл не существует или отсутствует на сервере.';
    }
  }

  removeAudioError() {
    this.hasAudioError = false;
    this.errorMessage = '';
  }

  setError(message: string) {
    this.hasAudioError = true;
    this.errorMessage = message;
    this.isLoading = false;
  }

  onFileIdChanged(fileId: string) {
    this.fileId = fileId;
    this.removeAudioError();
    this.checkAndLoadAudioFile();
  }

  checkAndLoadAudioFile() {
    if (!this.hasFileId()) {
      return;
    }

    this.isLoading = true;
    this.hasAudioError = false;
    this.errorMessage = '';

    const fileIdValue = this.fileId;
    this._commonFileInfoService.getInfo(fileIdValue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (result) => {
          if (!result.fileInfo) {
            this.setError(`Файл с идентификатором ${fileIdValue} не найден на сервере.`);
            return;
          }

          if (result.fileInfo.type !== FileType.Audio) {
            this.setError(`Файл с идентификатором ${fileIdValue} должен быть c типом Audio, а получено ${result.fileInfo.type}.`);
            return;
          }

          this.audioSrc = result.fileInfo.downloadUrl;
          this.loadAudioFile();
        },
        error: (error) => {
          this.setError(`Ошибка при получении информации о файле: ${error.message || 'Неизвестная ошибка'}`);
        }
      });
  }

  loadAudioFile() {
    if (!this.hasFileId() || !this.audioSrc) {
      return;
    }

    this.isLoading = true;
    this.hasAudioError = false;

    const audio = this.audioElement;
    if (audio) {
      audio.load();
    }
  }

  onLoadedMetadata() {
    const audio = this.audioElement;
    if (audio) {
      this.duration = audio.duration;
      this.isLoading = false;
    }
  }

  onTimeUpdate() {
    const audio = this.audioElement;
    if (audio) {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration;
    }
  }

  onEnded() {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  onCanPlay() {
    this.isLoading = false;
  }

  togglePlayPause() {
    const audio = this.audioElement;
    if (!audio) return;

    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
      audio.play().then(() => {
        this.isPlaying = true;
      }).catch(() => {
        this.hasAudioError = true;
      });
    }
  }

  restart() {
    const audio = this.audioElement;
    if (audio) {
      audio.currentTime = 0;
      this.currentTime = 0;
    }
  }

  rewind() {
    const audio = this.audioElement;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  }

  forward() {
    const audio = this.audioElement;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  }

  onVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value) / 100;
    this.volume = value;
    const audio = this.audioElement;
    if (audio) {
      audio.volume = value;
    }
    this.isMuted = value === 0;
  }

  toggleMute() {
    const audio = this.audioElement;
    if (!audio) return;

    if (this.isMuted) {
      audio.volume = this.volume;
      this.isMuted = false;
    } else {
      audio.volume = 0;
      this.isMuted = true;
    }
  }

  onSeekChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    const audio = this.audioElement;
    if (audio) {
      audio.currentTime = (value / 100) * audio.duration;
    }
  }

  formatTime(seconds: number): string {
    return AudioMethods.formatTime(seconds);
  }

  getProgress(): number {
    return AudioMethods.calculateProgress(this.currentTime, this.duration);
  }

  loadFiles() {
    this.loading = true;
    const isPrivate = this._htmlSettingsService.get().usePrivateFiles;

    const searchParams = {
      count: 50,
      offSet: 0,
      fileName: null,
      fileTypes: [FileType.Audio],
      applicationId: isPrivate ? this._htmlSettingsService.get().applicationId : null,
      q: this.q
    };

    if (isPrivate) {
      this._privateFileService.search(searchParams)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => {
          this.files = data.list.map(el => ({ fileId: el.id, fileName: el.fileName }));
          this.loading = false;
        });
    } else {
      this._publicFileService.search(searchParams)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => {
          this.files = data.list.map(el => ({ fileId: el.fileId.toString(), fileName: el.fileName }));
          this.loading = false;
        });
    }
  }

  onSearchChanged(q: { term: string, items: object[] }) {
    this.q = q.term;
    this.loadFiles();
  }

  onFileSelected(fileId: string) {
    const selectedFile = this.files.find(f => f.fileId === fileId);
    if (selectedFile) {
      this.fileId = fileId;
      this.checkAndLoadAudioFile();
    }
  }

  onFilesUploaded(fileIds: string[] | number[]) {
    if (fileIds && fileIds.length > 0) {
      const firstFileId = fileIds[0];
      this.fileId = typeof firstFileId === 'number' ? firstFileId.toString() : firstFileId;
      this.loadFiles();
      this.checkAndLoadAudioFile();
    }
  }

  removeAudio() {
    this.fileId = '';
    this.title = '';
    this.audioSrc = '';
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.removeAudioError();
  }

  ngOnInit(): void {
    if (this.audioPlayer?.nativeElement) {
      const audio = this.audioPlayer.nativeElement;
      audio.volume = this.volume;
    }

    if (this.hasFileId()) {
      this.checkAndLoadAudioFile();
    }

    this.loadFiles();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
