import { Component, Input, OnInit } from '@angular/core';
import { SimpleTextTag } from '../../../extensions/TextSimpleMethods';

@Component({
    selector: 'croco-html-xml-tag-text-view',
    templateUrl: './xml-tag-text-view.component.html',
    styleUrls: ['./xml-tag-text-view.component.css'],
    standalone: true
})
export class XmlTagTextViewComponent implements OnInit {

  @Input()
  item: SimpleTextTag;

  constructor() { }

  ngOnInit(): void {
  }
}