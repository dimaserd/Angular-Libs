import { Component, Input } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';

@Component({
  selector: 'croco-html-xml-tag-header-inner-text-view',
  templateUrl: './xml-tag-header-inner-text-view.component.html',
  standalone: true
})
export class XmlTagHeaderInnerTextViewComponent {

  @Input({ required: true })
  item: GenericTextTag;
}
