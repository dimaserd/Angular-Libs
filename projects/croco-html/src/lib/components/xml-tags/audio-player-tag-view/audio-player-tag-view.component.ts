import {
  Component,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AudioMethods } from '../../../extensions/AudioMethods';
import { InterfaceBlock } from '../../../models/InterfaceBlock';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { MatIcon } from '@angular/material/icon';
import { Subject, takeUntil } from "rxjs";
import { CrocoHtmlOptions } from '../../../options';
import { MatIconButton } from "@angular/material/button";
import { CommonFileInfoQueryService } from '../../../services/CommonFileInfoQueryService';
import { FileType } from '../../../services/file-models';

@Component({
  selector: 'croco-html-audio-player-tag-view',
  templateUrl: './audio-player-tag-view.component.html',
  styleUrls: ['./audio-player-tag-view.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ]
})
export class AudioPlayerTagViewComponent implements OnInit, OnDestroy, OnChanges {

  hasAudioError = false;
  errorMessage = '';
  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  isMuted = false;
  audioSrc = '';

  private unsubscribe = new Subject<void>();

  @ViewChild('audioPlayer', { static: false })
  audioPlayer: ElementRef<HTMLAudioElement>;

  @Input({ required: true })
  data: InterfaceBlock;

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions,
    private readonly _commonFileInfoService: CommonFileInfoQueryService,
  ) { }

  get fileId(): string {
    return this.data.data.fileId;
  }

  private get audioElement(): HTMLAudioElement | null {
    return this.audioPlayer?.nativeElement || null;
  }

  hasFileId() {
    return this.fileId && this.fileId !== '';
  }

  onErrorHandler() {
    this.hasAudioError = true;
    this.isLoading = false;
    if (!this.errorMessage) {
      this.errorMessage = 'Аудио-файл не найден по указанному идентификатору.';
    }
  }

  setError(message: string) {
    this.hasAudioError = true;
    this.errorMessage = message;
    this.isLoading = false;
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

  ngOnInit(): void {
    if (this.audioPlayer?.nativeElement) {
      const audio = this.audioElement;
      if (audio) {
        audio.volume = this.volume;
      }
    }

    if (this.hasFileId()) {
      this.checkAndLoadAudioFile();
    }
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      if (this.hasFileId()) {
        this.checkAndLoadAudioFile();
      }
    }
  }
}
