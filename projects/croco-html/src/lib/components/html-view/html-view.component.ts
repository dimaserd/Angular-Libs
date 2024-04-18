import { Component, Input } from '@angular/core';
import { ITagViewOptions } from '../xml-tags';

@Component({
  selector: 'croco-html-view',
  templateUrl: './html-view.component.html',
  styleUrls: ['./html-view.component.css']
})
export class HtmlViewComponent {
  @Input()
  html: string = "<body></body>";

  @Input()
  viewOptions: ITagViewOptions = {
    useCustomImageUrlRenderer: false,
    renderImageUrl(fileId, sizeType) {
      return "";
    },
  }
}
