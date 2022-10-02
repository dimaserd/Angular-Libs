import { Component, Input, OnInit } from '@angular/core';
import { RichTextData } from '../../../extensions/TextMethods';

@Component({
  selector: 'croco-html-xml-tag-rich-text-view',
  templateUrl: './xml-tag-rich-text-view.component.html',
  styleUrls: ['./xml-tag-rich-text-view.component.css']
})
export class XmlTagRichTextViewComponent implements OnInit {

  @Input()
  richTextData: RichTextData = null;

  constructor() { }

  ngOnInit(): void {
  }
  
}
