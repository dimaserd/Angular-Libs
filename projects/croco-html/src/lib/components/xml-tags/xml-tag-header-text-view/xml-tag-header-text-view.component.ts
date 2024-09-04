import { Component, Input, OnInit } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';
import { XmlTagHeaderInnerTextViewComponent } from '../xml-tag-header-inner-text-view/xml-tag-header-inner-text-view.component';

@Component({
    selector: 'croco-html-xml-tag-header-text-view',
    templateUrl: './xml-tag-header-text-view.component.html',
    styleUrls: ['./xml-tag-header-text-view.component.css'],
    standalone: true,
    imports: [XmlTagHeaderInnerTextViewComponent]
})
export class XmlTagHeaderTextViewComponent implements OnInit {

  @Input()
  item: GenericTextTag;

  constructor() { }

  ngOnInit(): void {
  }

}
