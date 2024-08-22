import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'vk-video-player',
  standalone: true,
  imports: [],
  templateUrl: './vk-video-player.component.html',
  styleUrl: './vk-video-player.component.scss'
})
export class VkVideoPlayerComponent{

  @Input() set link(link: string) {
    if(link && link !== 'null') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    }
    else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.defaultLink);
    }
  }
  public safeUrl: SafeResourceUrl;
  public defaultLink = "https://vk.com/video_ext.php?oid=-22822305&id=456241864&hd=2";

  constructor(private sanitizer: DomSanitizer) {}
}
