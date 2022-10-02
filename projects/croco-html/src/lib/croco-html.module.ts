import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CrocoHtmlDeclarations, MaterialModules } from ".";

@NgModule({
    declarations: [
      ...CrocoHtmlDeclarations
    ],
    exports: [
      ...CrocoHtmlDeclarations,
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgSelectModule,
      ...MaterialModules
    ]
})
export class CrocoHtmlModule { }
