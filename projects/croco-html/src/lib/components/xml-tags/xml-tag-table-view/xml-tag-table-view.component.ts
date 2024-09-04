import { Component, Input } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'croco-html-xml-tag-table-view',
    templateUrl: './xml-tag-table-view.component.html',
    styleUrls: ['./xml-tag-table-view.component.css'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class XmlTagTableViewComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  data: object;
}
