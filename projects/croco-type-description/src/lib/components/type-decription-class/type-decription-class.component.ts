import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { CrocoPropNameWithLink, CrocoTypeDescription, CrocoTypeDescriptionResult } from '../../models';
import { DartCodeClassGenerator } from '../../codeGenerators/dart/DartCodeClassGenerator';
import { TSClassGenerator } from '../../codeGenerators/typescript/TSClassGenerator';
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'croco-type-decription-class',
  templateUrl: './type-decription-class.component.html',
  styleUrls: ['./type-decription-class.component.css'],
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule, MatExpansionModule, MatNavList, RouterLink],
})
export class TypeDecriptionClassComponent implements OnInit {

  propNameAndLinks: CrocoPropNameWithLink[] = [];
  codeGenerationResult: string;
  panelOpenState = false;

  @Input() type: CrocoTypeDescription;
  @Input() wholeResult: CrocoTypeDescriptionResult;

  constructor(private _snackBar: MatSnackBar) {
  }

  codeGenerationType: string = "TypeScript";

  ngOnInit() {
    this.propNameAndLinks = this.type.properties.map(x => ({
      displayFullTypeName: x.typeDisplayFullName,
      displayFullTypeNameReference: x.typeDisplayFullName.replace("[]", ""),
      propertyName: x.propertyDescription.propertyName
    }))
    this.codeGenerationResult = new TSClassGenerator(true, false).generateClassesForType(this.wholeResult);
  }

  typeChanged(data: MatSelectChange) {
    if (data.value === "TypeScript") {
      this.codeGenerationResult = new TSClassGenerator(true, false).generateClassesForType(this.wholeResult);
    } else if (data.value === "Dart") {
      this.codeGenerationResult = new DartCodeClassGenerator().generateClassesForType(this.wholeResult);
    }
  }

  copyCode() {
    this._snackBar.open("Результат кодогенерации скопирован в буфер обмена", "Закрыть", { duration: 1500 });
  }
}
