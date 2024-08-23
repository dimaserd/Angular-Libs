import {Component, Input, ViewEncapsulation} from '@angular/core';
import { InterfaceBlock } from "../../../extensions/InterfaceBlock";
import {ETypeTagConstant} from "../../../extensions/TypeTagConstant";

@Component({
  selector: 'croco-html-xml-tag-view',
  templateUrl: './xml-tag-view.component.html',
  styleUrls: ['./xml-tag-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class XmlTagViewComponent {

  @Input()
  data:InterfaceBlock[] = [];

  protected readonly ETypeTagConstant = ETypeTagConstant;
}
