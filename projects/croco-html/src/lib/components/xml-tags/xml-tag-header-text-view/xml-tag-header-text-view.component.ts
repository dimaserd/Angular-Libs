import { Component, Input, OnInit } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';

@Component({
  selector: 'croco-html-xml-tag-header-text-view',
  templateUrl: './xml-tag-header-text-view.component.html',
  styleUrls: ['./xml-tag-header-text-view.component.css']
})
export class XmlTagHeaderTextViewComponent implements OnInit {

  @Input()
  item: GenericTextTag;

  constructor() { }

  ngOnInit(): void {
  }

}
