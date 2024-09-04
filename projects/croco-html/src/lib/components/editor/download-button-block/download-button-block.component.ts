import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HtmlBodyTag} from "../../../models/models";
import {XmlTagDownloadButtonComponent} from "../../xml-tags/xml-tag-download-button/xml-tag-download-button.component";
import {DownloadButtonTagData} from "../../../extensions/DownloadButtonMethods";

@Component({
  selector: 'croco-html-download-button-block',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    XmlTagDownloadButtonComponent
  ],
  templateUrl: './download-button-block.component.html',
  styleUrl: './download-button-block.component.css'
})
export class DownloadButtonBlockComponent {

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

  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
