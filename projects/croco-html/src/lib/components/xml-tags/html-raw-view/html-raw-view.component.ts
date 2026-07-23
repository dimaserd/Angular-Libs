import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { HtmlRawTagData } from '../../../tag-services';
import { InterfaceBlock } from '../../../models';
import { HtmlPageDataController } from '../../../services';


@Component({
  selector: 'croco-html-raw-view',
  templateUrl: './html-raw-view.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtmlRawViewComponent {

  private readonly _cdr = inject(ChangeDetectorRef)

  @Input({ required: true }) set data(item: InterfaceBlock) {
    const data = item.data as HtmlRawTagData;

    this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(data.innerHTML);
    this._cdr.markForCheck();
  }

  public _dataController: HtmlPageDataController;

  @Input({ required: true }) set dataController(controller: HtmlPageDataController) {
    this._dataController = controller;
    this._cdr.markForCheck();
  }

  safeHtml: SafeHtml | null = null;

  constructor(
    private readonly _sanitizer: DomSanitizer, 
    private readonly router: Router) { }

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
