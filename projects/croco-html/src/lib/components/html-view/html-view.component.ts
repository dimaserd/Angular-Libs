import { Component, Input } from '@angular/core';

@Component({
  selector: 'croco-html-view',
  templateUrl: './html-view.component.html',
  styleUrls: ['./html-view.component.css']
})
export class HtmlViewComponent {
  @Input()
  html: string = "<body></body>";
}
