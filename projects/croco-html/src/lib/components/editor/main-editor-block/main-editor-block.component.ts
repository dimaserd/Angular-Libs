import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextTags } from '../../../extensions/TextMethods';
import { HtmlBodyTag } from '../../../models/models';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { HtmlRawEditorComponent } from '../html-raw-editor/html-raw-editor.component';
import { DownloadFileButtonBlockComponent } from '../download-file-button-block/download-file-button-block.component';
import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { ExternalVideoBlockComponent } from '../external-video-block/external-video-block.component';
import {CustomButtonBlockComponent} from "../custom-button-block/custom-button-block.component";

@Component({
  selector: 'croco-html-main-editor-block',
  templateUrl: './main-editor-block.component.html',
  styleUrls: ['./main-editor-block.component.css'],
  standalone: true,
  imports: [
    TextEditorComponent,
    ImageEditorComponent,
    DownloadFileButtonBlockComponent,
    HtmlRawEditorComponent,
    MatIconButton,
    MatIcon,
    ExternalVideoBlockComponent,
    CustomButtonBlockComponent
  ]
})
export class MainEditorBlockComponent implements OnInit {

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

  ngOnInit(): void {
  }
}
