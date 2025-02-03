import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';;

@Component({
    selector: 'croco-html-raw-view',
    templateUrl: './html-raw-view.component.html',
    styleUrls: ['./html-raw-view.component.css'],
    standalone: true
})
export class HtmlRawViewComponent implements OnChanges {

  @Input()
  rawHtml = "";

  safeHtml : SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rawHtml'] && changes['rawHtml'].currentValue !== changes['rawHtml'].previousValue) {
      this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.rawHtml);
    }
  }
}
