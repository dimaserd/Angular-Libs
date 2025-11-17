import {Component, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {Router} from "@angular/router";

;

@Component({
  selector: 'croco-html-raw-view',
  templateUrl: './html-raw-view.component.html',
  standalone: true
})
export class HtmlRawViewComponent implements OnChanges {

  @Input() rawHtml = "";

  safeHtml: SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer, private readonly router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rawHtml'] && changes['rawHtml'].currentValue !== changes['rawHtml'].previousValue) {
      this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.rawHtml);
    }
  }

  handleLink(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest('a');
    if (!target) {
      return;
    }

    const href = target.getAttribute('href');
    if (!href) {
      return;
    }

    const targetAttr = target.getAttribute('target');

    if (targetAttr === '_blank') {
      return;
    }

    const isExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('www.') ||
      href.match(/^[a-zA-Z]+:\/\//);

    if (isExternal) {
      return;
    }
    event.preventDefault();

    const path = href.startsWith('/') ? href : `/${href}`;

    this.router.navigate([path]);
  }

}
