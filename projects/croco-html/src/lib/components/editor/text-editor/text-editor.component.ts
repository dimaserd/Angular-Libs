import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ISingleTagStorage } from '../../../models';
import { TextAlignment, TextTagDataConsts } from '../../../tag-services';

@Component({
  selector: 'croco-html-text-editor',
  templateUrl: './text-editor.component.html',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize
  ]
})
export class TextEditorComponent {

  _tag: HtmlBodyTag;
  _tagStorage: ISingleTagStorage;

  @Input({ required: true })
  set tagStorage(data: ISingleTagStorage) {
    this._tagStorage = data;
    this._tag = this._tagStorage.get();
    this._horizontalAlignment = this._tag.attributes.hasOwnProperty(TextTagDataConsts.HAlign)
      ? this._tag.attributes[TextTagDataConsts.HAlign]
      : TextAlignment.Left
  }

  @Input({ required: true })
  presentOrEdit = false;

  public TextAlignment = TextAlignment;

  public _horizontalAlignment: TextAlignment = TextAlignment.Left;

  changeData() {
    this._tag.attributes[TextTagDataConsts.HAlign] = this._horizontalAlignment;

    this._tagStorage.set(this._tag);
  }

  getInnerHtml() {
    return `<${this._tag.tagDescription.tag}>${this._tag.innerHtml}<${this._tag.tagDescription.tag}/>`;
  }
}
