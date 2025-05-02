import { Component, Input, OnInit } from '@angular/core';
import { RichTextData } from '../../../extensions/TextMethods';
import { RichTextToHtmlPipe } from '../../../pipes/RichTextToHtmlPipe';

@Component({
    selector: 'croco-html-xml-tag-rich-text-view',
    templateUrl: './xml-tag-rich-text-view.component.html',
    standalone: true,
    imports: [RichTextToHtmlPipe]
})
export class XmlTagRichTextViewComponent implements OnInit {

  @Input()
  richTextData: RichTextData = null;

  constructor() { }

  ngOnInit(): void {
  }
  
}
