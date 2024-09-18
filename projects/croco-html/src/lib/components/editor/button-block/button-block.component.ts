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
  selector: 'croco-html-button-block',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    XmlTagDownloadFileButtonComponent,
    XmlTagButtonComponent
  ],
  templateUrl: './button-block.component.html',
  styleUrl: './button-block.component.css'
})
export class ButtonBlockComponent {
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
    this.tagData.type = (this.tag.attributes as ButtonTagData).type;
    this.tagData.text = (this.tag.attributes as ButtonTagData).text;
    this.tagData.click = (this.tag.attributes as ButtonTagData).click;
  }

  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
