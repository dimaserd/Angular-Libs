import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HtmlBodyTag} from "../../../models/models";
import {ButtonTagData} from "../../../extensions/ButtonMethods";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  XmlTagDownloadFileButtonComponent
} from "../../xml-tags/xml-tag-download-file-button/xml-tag-download-file-button.component";
import {XmlTagButtonComponent} from "../../xml-tags/xml-tag-custom-button/xml-tag-button.component";

@Component({
  selector: 'croco-html-button-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    XmlTagDownloadFileButtonComponent,
    XmlTagButtonComponent
  ],
  templateUrl: './button-editor.component.html',
  styleUrl: './button-editor.component.css'
})
export class ButtonEditorComponent {
  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  tagData: ButtonTagData = {
    type: '',
    text: '',
    click: ''
  };

  ngOnInit(): void {
    const data = this.tag.attributes as ButtonTagData;
    this.tagData.type = data.type;
    this.tagData.text = data.text;
    this.tagData.click = data.click;
  }

  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
