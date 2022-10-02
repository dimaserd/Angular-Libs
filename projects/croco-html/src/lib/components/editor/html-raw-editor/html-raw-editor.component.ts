import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';

@Component({
  selector: 'croco-html-html-raw-editor',
  templateUrl: './html-raw-editor.component.html',
  styleUrls: ['./html-raw-editor.component.css']
})
export class HtmlRawEditorComponent implements OnInit {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor() { }

  ngOnInit(): void {
  }

}
