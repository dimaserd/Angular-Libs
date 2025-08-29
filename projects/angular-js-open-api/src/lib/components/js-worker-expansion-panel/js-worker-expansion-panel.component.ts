import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsOpenApiServiceDocumentation } from '../../models/JsOpenApiServiceDocumentation';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {NgForOf} from "@angular/common";
import {JsWorkerMethodComponent} from "../js-worker-method/js-worker-method.component";

@Component({
  selector: 'croco-js-worker-expansion-panel',
  templateUrl: './js-worker-expansion-panel.component.html',
  styleUrls: ['./js-worker-expansion-panel.component.css'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    NgForOf,
    JsWorkerMethodComponent,
    MatExpansionPanelHeader
  ],
  standalone: true
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
