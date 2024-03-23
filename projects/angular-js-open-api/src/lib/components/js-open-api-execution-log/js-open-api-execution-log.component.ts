import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { JsExecutionLog } from '../../models';

@Component({
  selector: 'croco-js-open-api-execution-log',
  templateUrl: './js-open-api-execution-log.component.html',
  styleUrls: ['./js-open-api-execution-log.component.css']
})
export class JsOpenApiExecutionLogComponent implements OnInit {

  @Input() log: JsExecutionLog;

  panelOpenState: boolean = false;

  viewModel:JsExecutionLogViewModel;

  constructor(private _clipboardService: ClipboardService, private _snackBar: MatSnackBar) {

  }

  copyDataJson(){
    this._snackBar.open("Cкопировано в буфер обмена", "Закрыть", {duration: 1500});
    this._clipboardService.copy(this.log.dataJson);
  }

  ngOnInit(): void {
    this.viewModel = {
      loggedOnUtc: this.log.loggedOnUtc,
      eventIdName: this.log.eventIdName,
      message: this.log.message,
      dataJson: this.log.dataJson,
      dataJsonShort: this.log.dataJson != null && this.log.dataJson.length > 15? `${this.log.dataJson.substring(0, 10)}...` : this.log.dataJson
    }
  }
}

interface JsExecutionLogViewModel {
  loggedOnUtc: string | Date;
  eventIdName: string;
  message: string;
  dataJson: string;
  dataJsonShort: string;
}