import { Component, Input, OnInit } from '@angular/core';
import { JsScriptExecutedResult } from '../../models/JsScriptExecutedResult';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {JsOpenApiLoggedVariableComponent} from "../js-open-api-logged-variable/js-open-api-logged-variable.component";
import {NgForOf, NgIf} from "@angular/common";
import {JsOpenApiExecutionLogComponent} from "../js-open-api-execution-log/js-open-api-execution-log.component";

@Component({
  selector: 'croco-js-open-api-script-result',
  templateUrl: './js-open-api-script-result.component.html',
  styleUrls: ['./js-open-api-script-result.component.css'],
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    JsOpenApiLoggedVariableComponent,
    NgForOf,
    NgIf,
    JsOpenApiExecutionLogComponent,
    MatExpansionPanelHeader,
  ]
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
