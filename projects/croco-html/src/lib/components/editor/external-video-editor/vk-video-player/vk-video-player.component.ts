import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'vk-video-player',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vk-video-player.component.html',
  styleUrl: '../external-video-editor.component.scss'
})
export class VkVideoPlayerComponent {

  private readonly _cdr = inject(ChangeDetectorRef);

  @Input() set link(link: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this._cdr.markForCheck();
  }

  public safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }
}
