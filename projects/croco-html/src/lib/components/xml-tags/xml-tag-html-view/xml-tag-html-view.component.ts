import { Component, Input } from '@angular/core';

@Component({
  selector: 'croco-html-xml-tag-html-view',
  templateUrl: './xml-tag-html-view.component.html',
  styleUrls: ['./xml-tag-html-view.component.css']
})
export class XmlTagHtmlViewComponent {

  constructor() { }

  @Input()
  html: string = "";
}
