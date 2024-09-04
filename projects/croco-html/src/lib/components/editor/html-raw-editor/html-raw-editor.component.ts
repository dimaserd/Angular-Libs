import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'croco-html-html-raw-editor',
    templateUrl: './html-raw-editor.component.html',
    styleUrls: ['./html-raw-editor.component.css'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, CdkTextareaAutosize, FormsModule]
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
