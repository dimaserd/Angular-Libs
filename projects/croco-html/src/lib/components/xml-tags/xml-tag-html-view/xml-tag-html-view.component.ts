import { Component, Input } from '@angular/core';

@Component({
    selector: 'croco-html-xml-tag-html-view',
    templateUrl: './xml-tag-html-view.component.html',
    styleUrl: './xml-tag-html-view.component.scss',
    standalone: true
})
export class XmlTagHtmlViewComponent {

  constructor() { }

  @Input()
  html: string = "";
}
