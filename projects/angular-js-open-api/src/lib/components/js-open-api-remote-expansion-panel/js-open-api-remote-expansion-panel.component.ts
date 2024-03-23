import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RemoteJsOpenApiDocs } from '../../models';

@Component({
  selector: 'croco-js-open-api-remote-expansion-panel',
  templateUrl: './js-open-api-remote-expansion-panel.component.html',
  styleUrls: ['./js-open-api-remote-expansion-panel.component.css']
})
export class JsOpenApiRemoteExpansionPanelComponent implements OnInit {
  
  panelOpenState = false;
  
  @Input() remoteDoc: RemoteJsOpenApiDocs;
  @Output() onGetScript = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onGetScriptHandler(script: string){
    this.onGetScript.emit(script);
  }
}