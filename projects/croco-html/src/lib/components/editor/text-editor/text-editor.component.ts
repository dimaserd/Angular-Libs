import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';

@Component({
    selector: 'croco-html-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css'],
    standalone: true,
    imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatIcon, MatFormField, MatLabel, MatInput, CdkTextareaAutosize]
})
export class TextEditorComponent implements OnInit {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor() { }

  ngOnInit(): void {
  }

  getInnerHtml(){
    return `<${this.tag.tagDescription.tag}>${this.tag.innerHtml}<${this.tag.tagDescription.tag}/>`;
  }
}
