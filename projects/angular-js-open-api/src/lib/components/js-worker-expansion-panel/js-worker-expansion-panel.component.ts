import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsOpenApiServiceDocumentation } from '../../models/JsOpenApiServiceDocumentation';

@Component({
  selector: 'croco-js-worker-expansion-panel',
  templateUrl: './js-worker-expansion-panel.component.html',
  styleUrls: ['./js-worker-expansion-panel.component.css']
})
export class JsWorkerExpansionPanelComponent {
  @Input() worker: JsOpenApiServiceDocumentation;
  @Input() remoteName: string;
  @Output() onGetScript = new EventEmitter<string>();
  panelOpenState = false;

  onGetScriptHandler(script: string){
    this.onGetScript.emit(script);
  }
}