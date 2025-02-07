import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'vk-video-player',
  standalone: true,
  imports: [],
  templateUrl: './vk-video-player.component.html',
  styleUrl: '../external-video-editor.component.scss'
})
export class VkVideoPlayerComponent {

  @Input() set link(link: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }
}
