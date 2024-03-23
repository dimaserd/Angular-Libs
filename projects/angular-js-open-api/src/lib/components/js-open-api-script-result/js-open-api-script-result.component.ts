import { Component, Input, OnInit } from '@angular/core';
import { JsScriptExecutedResult } from '../../models/JsScriptExecutedResult';

@Component({
  selector: 'croco-js-open-api-script-result',
  templateUrl: './js-open-api-script-result.component.html',
  styleUrls: ['./js-open-api-script-result.component.css']
})
export class JsOpenApiScriptResultComponent implements OnInit {

  panelOpenState = false;

  @Input() scriptResult: JsScriptExecutedResult;
  constructor() { }

  message: string;
  ngOnInit() {
    this.message = this.scriptResult.isSucceeded? "Успешно выполнено" : this.scriptResult.errorMessage;
  }
}