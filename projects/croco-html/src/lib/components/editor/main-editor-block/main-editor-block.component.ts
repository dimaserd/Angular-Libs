import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextTags } from '../../../extensions/TextMethods';
import { HtmlBodyTag } from '../../../models/models';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { HtmlRawEditorComponent } from '../html-raw-editor/html-raw-editor.component';
import { DownloadFileButtonEditorComponent } from '../download-file-button-editor/download-file-button-editor.component';
import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { ExternalVideoEditorComponent } from '../external-video-editor/external-video-editor.component';
import { ButtonEditorComponent } from "../button-editor/button-editor.component";
import { CustomWidgetEditorComponent } from "../custom-widget-editor/custom-widget-editor.component";

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
    CustomWidgetEditorComponent
  ]
})
export class MainEditorBlockComponent {

  textTags = TextTags.allTextTags;

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagSaved = new EventEmitter<HtmlBodyTag>();

  @Output()
  onTagRemoved = new EventEmitter<HtmlBodyTag>();

  tagUpdatedHandler(tag: HtmlBodyTag): void {
  }

  save() {
    this.tag.presentOrEdit = true;
    this.onTagSaved.emit(this.tag);
  }

  deleteItem() {
    this.onTagRemoved.emit(this.tag);
  }
}
