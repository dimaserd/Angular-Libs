import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InterfaceBlock } from "../../../extensions/InterfaceBlock";
import { ITagViewOptions } from '../../../models/models';

@Component({
  selector: 'croco-html-xml-tag-view',
  templateUrl: './xml-tag-view.component.html',
  styleUrls: ['./xml-tag-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class XmlTagViewComponent {

  @Input()
  viewOptions: ITagViewOptions = {
    useCustomImageUrlRenderer: false,
    renderImageUrl(fileId, sizeType) {
      return "";
    },
  }

  @Input()
  data:InterfaceBlock[] = [];

  constructor() {
  }

}