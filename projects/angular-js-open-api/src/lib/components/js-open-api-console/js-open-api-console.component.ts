import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsScriptExecutedResult } from '../../models';
import { JsScriptExecutor } from '../../services';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {JsOpenApiScriptResultComponent} from "../js-open-api-script-result/js-open-api-script-result.component";

@Component({
  selector: 'croco-js-open-api-console',
  templateUrl: './js-open-api-console.component.html',
  styleUrls: ['./js-open-api-console.component.css'],
  standalone: true,
  imports: [
    MatFormField,
    CdkTextareaAutosize,
    MatInput,
    MatFormField,
    MatButton,
    JsOpenApiScriptResultComponent
  ]
})
export class JsOpenApiConsoleComponent implements OnInit {

  script: string;

  result: JsScriptExecutedResult;

  constructor(private _snackBar: MatSnackBar,
    private _executor: JsScriptExecutor) {
  }

  ngOnInit() {
  }

  executeScript(){

    this._executor.ExecuteScript(this.script).subscribe(res => {

      let text = res.isSucceeded? "Скрипт выполнен успешно" : res.errorMessage;
      this._snackBar.open(text, "Закрыть", {duration: 1500});

      this.result = res;
    });
  }

  setValue(e: Event): void {
    const input = e.target as HTMLInputElement | null;
    if (input) {
      this.script = input.value;
    }
  }
}
