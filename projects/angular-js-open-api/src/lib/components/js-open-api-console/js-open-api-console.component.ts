import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsScriptExecutedResult } from '../../models';
import { JsScriptExecutor } from '../../services';


@Component({
  selector: 'croco-js-open-api-console',
  templateUrl: './js-open-api-console.component.html',
  styleUrls: ['./js-open-api-console.component.css']
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
}