import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CrocoHtmlDeclarations, MaterialModules } from ".";
import { YouTubePlayerModule } from "@angular/youtube-player";

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
    ...MaterialModules,
    YouTubePlayerModule
  ]
})
export class CrocoHtmlModule { }
