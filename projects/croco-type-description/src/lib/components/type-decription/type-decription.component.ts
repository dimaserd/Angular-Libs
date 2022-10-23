import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrocoTypeDescriptionResult, CrocoTypeDescription } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'croco-type-decription',
  templateUrl: './type-decription.component.html',
  styleUrls: ['./type-decription.component.css']
})
export class TypeDecriptionComponent implements OnInit {

  typeDisplayFullName: string;
  http:HttpClient;
  baseUrl: string;
  result: CrocoTypeDescriptionResult = null;

  constructor(
    private _titleService: Title,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string
  )
  {
    this._titleService.setTitle("Описания типов");
    this.http = http;
    this.baseUrl = baseUrl;
  }

  openSnackBar() {
    this._snackBar.open("Тип данных не найден", "Закрыть", {
      duration: 5000,
    });
  }

  getType(){
    if(!this.typeDisplayFullName || this.typeDisplayFullName.length === 0){
      return;
    }

    this.http.post<CrocoTypeDescriptionResult>(this.baseUrl + `Documentation/Type?typeName=${this.typeDisplayFullName}`, {})
    .subscribe(res => {
        if(res === null){
          this.openSnackBar();
          this.result = null;
          this.types = [];
          return;
        }

        this.result = res;
        this.types = res.types.filter(x => x.typeDisplayFullName === res.typeDisplayFullName);
    });
  }

  types: CrocoTypeDescription[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.typeDisplayFullName = params['typeDisplayFullName'];
      this.getType();
    });
  }
}
