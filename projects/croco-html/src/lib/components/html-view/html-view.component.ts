import { Component, Input } from '@angular/core';
import { ToPreviewPipe } from '../../pipes/to-preview.pipe';
import { XmlTagViewComponent } from '../xml-tags/xml-tag-view/xml-tag-view.component';
import { HtmlViewController } from '../../services/HtmlViewController';

@Component({
    selector: 'croco-html-view',
    templateUrl: './html-view.component.html',
    styleUrls: ['./html-view.component.css'],
    standalone: true,
    imports: [XmlTagViewComponent, ToPreviewPipe]
})
export class HtmlViewComponent {
  @Input()
  html: string = "<body></body>";

  @Input()
  controller = new HtmlViewController();
}
