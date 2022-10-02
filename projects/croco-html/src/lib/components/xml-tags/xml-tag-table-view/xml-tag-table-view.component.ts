import { Component, Input } from '@angular/core';

@Component({
  selector: 'croco-html-xml-tag-table-view',
  templateUrl: './xml-tag-table-view.component.html',
  styleUrls: ['./xml-tag-table-view.component.css']
})
export class XmlTagTableViewComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  data: object;
}
