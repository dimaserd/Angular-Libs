import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JsScriptExecutor } from '../../services';
import { JsOpenApiServiceDocumentation } from '../../models';

@Component({
  selector: 'croco-js-open-api-main',
  templateUrl: './js-open-api-main.component.html',
  styleUrls: ['./js-open-api-main.component.css']
})

export class JsOpenApiMainComponent {

  public displayedColumns: string[] = ['name'];
  public workers: JsOpenApiServiceDocumentation[] = [];

  constructor( 
    private _clipboardService: ClipboardService, 
    jsOpenApiService: JsScriptExecutor,
    private _snackBar: MatSnackBar,
    titleService: Title) {
      titleService.setTitle("JS Open API");
      jsOpenApiService.getDocs().subscribe(result => {
       this.workers = result.services;
    });
  }

  onGetScriptHandler(script: string){
    this._snackBar.open("Скрипт скопирован в буфер обмена", "Закрыть", {duration: 1500});
    this._clipboardService.copy(script);
  }
}