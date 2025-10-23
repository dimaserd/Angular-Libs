import { Component, Inject, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AudioMethods, FileAudioTagDataConsts } from '../../../extensions/AudioMethods';
import { InterfaceBlock } from '../../../models/InterfaceBlock';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { MatIcon } from '@angular/material/icon';
import { Subject, takeUntil } from "rxjs";
import { CrocoHtmlOptions } from '../../../options';
import {MatIconButton} from "@angular/material/button";

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
export class AudioPlayerTagViewComponent implements OnInit, OnDestroy {

  hasAudioError = false;
  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  isMuted = false;

  private unsubscribe = new Subject<void>();

  @ViewChild('audioPlayer', { static: false })
  audioPlayer: ElementRef<HTMLAudioElement>;

  @Input({ required: true })
  data: InterfaceBlock;

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions,
  ) { }

  get fileId(): string {
    return this.data.data.fileId;
  }

  get fileName(): string {
    return this.data.data.fileName;
  }

  getSrc() {
    // return AudioMethods.buildUrl(this.fileId, this.fileName);
    return this.fileId
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

        if (this.hasFileId()) {
          this.isLoading = true;
          audio.load();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
