import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  standalone: true,
  imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatIcon, MatFormField, MatLabel, MatInput, CdkTextareaAutosize]
})
export class TextEditorComponent {

  @Input({required: true})
  tag: HtmlBodyTag;

  @Input({required: true})
  presentOrEdit = false;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  getInnerHtml() {
    return `<${this.tag.tagDescription.tag}>${this.tag.innerHtml}<${this.tag.tagDescription.tag}/>`;
  }
}
