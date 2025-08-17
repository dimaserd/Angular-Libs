import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TextTags } from '../../../extensions/TextMethods';
import { HtmlBodyTag } from '../../../models/models';
import { MatIconButton } from '@angular/material/button';
import { HtmlRawEditorComponent } from '../html-raw-editor/html-raw-editor.component';
import { DownloadFileButtonEditorComponent } from '../download-file-button-editor/download-file-button-editor.component';
import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { ExternalVideoEditorComponent } from '../external-video-editor/external-video-editor.component';
import { ButtonEditorComponent } from "../button-editor/button-editor.component";
import { CustomWidgetEditorComponent } from "../custom-widget-editor/custom-widget-editor.component";
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../options';
import { JsonPipe } from '@angular/common';
import { DefinedCustomEditorBlockComponent } from "./components/defined-custom-editor-block/defined-custom-editor-block.component";
import { ISingleTagStorage } from '../../../models/editor-models';

@Component({
  selector: 'croco-html-main-editor-block',
  templateUrl: './main-editor-block.component.html',
  styleUrls: ['./main-editor-block.component.css'],
  standalone: true,
  imports: [
    TextEditorComponent,
    ImageEditorComponent,
    DownloadFileButtonEditorComponent,
    HtmlRawEditorComponent,
    MatIconButton,
    ExternalVideoEditorComponent,
    ButtonEditorComponent,
    CustomWidgetEditorComponent,
    JsonPipe,
    DefinedCustomEditorBlockComponent
  ]
})
export class MainEditorBlockComponent {

  textTags = TextTags.allTextTags;

  @Input({ required: true })
  set tag(data: HtmlBodyTag) {
    this._tag = data;
    this._tagStorage = new SingleTagStorage();

    this._tagStorage.set(this._tag);
  }

  public _tag: HtmlBodyTag;
  public _tagStorage: SingleTagStorage;

  public presentOrEdit = false;

  @Output()
  onTagSaved = new EventEmitter<HtmlBodyTag>();

  @Output()
  onTagRemoved = new EventEmitter<HtmlBodyTag>();

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  tagUpdatedHandler(tag: HtmlBodyTag): void {
  }

  save() {

    const tag = this._tagStorage.get();

    this.onTagSaved.emit(this.tag);
    this.presentOrEdit = true;
  }

  isDefinedCustomTag() {

    const tagName = this._tag.tagDescription.tag;

    if (this._options.definedCustomTags.hasOwnProperty(tagName)) {
      return true;
    }

    return false;
  }

  deleteItem() {
    this.onTagRemoved.emit(this.tag);
  }
}

export class SingleTagStorage implements ISingleTagStorage {
  private _tag: HtmlBodyTag;

  set(tag: HtmlBodyTag): void {
    this._tag = tag;
  }

  get(): HtmlBodyTag {
    return this._tag;
  }
}
