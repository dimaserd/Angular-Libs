import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { CrocoTypeDescription, CrocoTypeDescriptionResult } from '../../models';
import { DartCodeClassGenerator } from '../../codeGenerators/dart/DartCodeClassGenerator';
import { TSClassGenerator } from '../../codeGenerators/typescript/TSClassGenerator';

@Component({
  selector: 'croco-type-decription-class',
  templateUrl: './type-decription-class.component.html',
  styleUrls: ['./type-decription-class.component.css']
})


export class TypeDecriptionClassComponent implements OnInit {

  propNameAndLinks: PropNameWithLink[] = [];
  codeGenerationResult: string;
  panelOpenState = false;

  @Input() type: CrocoTypeDescription;
  @Input() wholeResult: CrocoTypeDescriptionResult;

  constructor(private _clipboardService: ClipboardService, private _snackBar: MatSnackBar) {}

  codeGenerationType: string = "TypeScript";
  myForm = new FormGroup({
    "type": new FormControl(),
  });

  ngOnInit() {
    this.propNameAndLinks = this.type.properties.map(x => ({
      displayFullTypeName: x.typeDisplayFullName,
      displayFullTypeNameReference: x.typeDisplayFullName.replace("[]", ""),
      propertyName: x.propertyDescription.propertyName
    }))
    this.codeGenerationResult = new TSClassGenerator(true, false).GenerateClassesForType(this.wholeResult);
  }

  typeChanged(data:MatSelectChange){
    if(data.value === "TypeScript"){
      this.codeGenerationResult = new TSClassGenerator(true, false).GenerateClassesForType(this.wholeResult);
    }
    else if(data.value === "Dart"){
      this.codeGenerationResult = new DartCodeClassGenerator().GenerateClassesForType(this.wholeResult);
    }
  }

  copyCode(){
    this._snackBar.open("Результат кодогенерации скопирован в буфер обмена", "Закрыть", {duration: 1500});
    this._clipboardService.copy(this.codeGenerationResult);
  }
}

interface PropNameWithLink {
  displayFullTypeName: string;
  displayFullTypeNameReference: string;
  propertyName: string;
}
