import { Component, Input } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';

@Component({
  selector: 'croco-html-xml-tag-text-view',
  templateUrl: './xml-tag-text-view.component.html',
  standalone: true
})
export class XmlTagTextViewComponent {

  @Input({ required: true })
  item: GenericTextTag;
}