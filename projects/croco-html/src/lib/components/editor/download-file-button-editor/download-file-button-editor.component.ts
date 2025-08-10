import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HtmlBodyTag } from "../../../models/models";
import { XmlTagDownloadFileButtonComponent } from "../../xml-tags/xml-tag-download-file-button/xml-tag-download-file-button.component";
import { DownloadButtonTagData } from '../../../tag-services/DownloadButtonTagService';

@Component({
  selector: 'croco-html-download-file-button-editor',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    XmlTagDownloadFileButtonComponent,
    MatFormFieldModule
  ],
  templateUrl: './download-file-button-editor.component.html'
})
export class DownloadFileButtonEditorComponent {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  tagData: DownloadButtonTagData = {
    link: '',
    title: ''
  };

  ngOnInit(): void {
    this.tagData.link = (this.tag.attributes as DownloadButtonTagData).link;
    this.tagData.title = (this.tag.attributes as DownloadButtonTagData).title;
  }

  linkChanged() {
    this.tag.attributes = this.tagData;
  }
}
