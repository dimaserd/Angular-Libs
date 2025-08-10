import { Component, Input } from '@angular/core';
import { GenericTextTag } from '../../../extensions/TextSimpleMethods';
import { XmlTagHeaderInnerTextViewComponent } from '../xml-tag-header-inner-text-view/xml-tag-header-inner-text-view.component';

@Component({
  selector: 'croco-html-xml-tag-header-text-view',
  templateUrl: './xml-tag-header-text-view.component.html',
  standalone: true,
  imports: [XmlTagHeaderInnerTextViewComponent]
})
export class XmlTagHeaderTextViewComponent {

  @Input({ required: true })
  item: GenericTextTag;
}
