import { Component, Input, OnInit } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';

@Component({
    selector: 'croco-html-xml-tag-header-inner-text-view',
    templateUrl: './xml-tag-header-inner-text-view.component.html',
    styleUrls: ['./xml-tag-header-inner-text-view.component.css'],
    standalone: true
})
export class XmlTagHeaderInnerTextViewComponent implements OnInit {

  @Input()
  item: GenericTextTag;

  constructor() { }

  ngOnInit(): void {
  }

}
