import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'youtube-video-player',
  standalone: true,
  imports: [],
  templateUrl: './youtube-video-player.component.html',
  styleUrl: '../external-video-editor.component.scss'
})
export class YoutubeVideoPlayerComponent {

  @Input() set link(link: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }
}
