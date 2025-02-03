import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'code-video',
  standalone: true,
  imports: [],
  templateUrl: './code-video.component.html',
  styleUrl: '../external-video-editor.component.scss'
})
export class CodeVideoComponent implements OnChanges {

  @Input() code = "";

  safeHtml : SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] && changes['code'].currentValue !== changes['code'].previousValue) {
      this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.code);
    }
  }
}
