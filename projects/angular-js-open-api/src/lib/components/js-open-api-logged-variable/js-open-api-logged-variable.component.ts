import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { JsLogggedVariables } from '../../models/JsLogggedVariables';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'croco-js-open-api-logged-variable',
  templateUrl: './js-open-api-logged-variable.component.html',
  styleUrls: ['./js-open-api-logged-variable.component.css'],
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatExpansionPanelHeader,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatButton
  ]
})
export class JsOpenApiLoggedVariableComponent implements OnInit {
  panelOpenState = false;
  @Input() log: JsLogggedVariables;

  varaibles: JsSerializedVariableViewModel[];
  displayedColumns: string[] = ['typeFullName', 'dataJson'];

  constructor(private _clipboardService: ClipboardService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.varaibles = this.log.serializedVariables.map(x => ({
      typeFullName: x.typeFullName,
      dataJson: x.dataJson,
      dataJsonShort: x.dataJson.length > 20 ? `${x.dataJson.substr(0, 15)}...` : x.dataJson
    }));
  }

  copyDataJson(log: JsSerializedVariableViewModel) {
    this._snackBar.open("Cкопировано в буфер обмена", "Закрыть", { duration: 1500 });
    this._clipboardService.copy(log.dataJson);
  }

}

interface JsSerializedVariableViewModel {
  typeFullName: string;
  dataJsonShort: string;
  dataJson: string;
}
