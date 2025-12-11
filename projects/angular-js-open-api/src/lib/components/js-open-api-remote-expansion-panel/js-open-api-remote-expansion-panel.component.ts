import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RemoteJsOpenApiDocs } from '../../models';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {JsWorkerExpansionPanelComponent} from "../js-worker-expansion-panel/js-worker-expansion-panel.component";


@Component({
  selector: 'croco-js-open-api-remote-expansion-panel',
  templateUrl: './js-open-api-remote-expansion-panel.component.html',
  styleUrls: ['./js-open-api-remote-expansion-panel.component.css'],
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    JsWorkerExpansionPanelComponent
]
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
