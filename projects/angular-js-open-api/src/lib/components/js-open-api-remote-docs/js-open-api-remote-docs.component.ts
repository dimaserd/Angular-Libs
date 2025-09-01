import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { RemoteJsOpenApiDocs } from '../../models';
import { JsScriptExecutor } from '../../services';
import {
  JsOpenApiRemoteExpansionPanelComponent
} from "../js-open-api-remote-expansion-panel/js-open-api-remote-expansion-panel.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'croco-js-open-api-remote-docs',
  templateUrl: './js-open-api-remote-docs.component.html',
  styleUrls: ['./js-open-api-remote-docs.component.css'],
  standalone: true,
  imports: [
    JsOpenApiRemoteExpansionPanelComponent,
    NgForOf
  ]
})
export class JsOpenApiRemoteDocsComponent {

  @Output() onGetScript = new EventEmitter<string>();

  remoteDocs: RemoteJsOpenApiDocs[] = [];

  typeDisplayFullName: string = "RemoteJsOpenApi";
  formControl: UntypedFormControl = new UntypedFormControl();

  constructor(jsExecutor: JsScriptExecutor) {
    jsExecutor.getRemoteDocs().subscribe(result => {
        this.remoteDocs = result;
    });
  }

  addNew(){
  }

  onGetScriptHandler(script: string){
    this.onGetScript.emit(script);
  }
}
