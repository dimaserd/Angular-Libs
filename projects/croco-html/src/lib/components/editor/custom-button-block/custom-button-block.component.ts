import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HtmlBodyTag} from "../../../models/models";
import {CustomButtonTagData} from "../../../extensions/CustomButtonMethods";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  XmlTagDownloadFileButtonComponent
} from "../../xml-tags/xml-tag-download-file-button/xml-tag-download-file-button.component";
import {XmlTagCustomButtonComponent} from "../../xml-tags/xml-tag-custom-button/xml-tag-custom-button.component";

@Component({
  selector: 'croco-html-custom-button-block',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    XmlTagDownloadFileButtonComponent,
    XmlTagCustomButtonComponent
  ],
  templateUrl: './custom-button-block.component.html',
  styleUrl: './custom-button-block.component.css'
})
export class CustomButtonBlockComponent {
  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  tagData: CustomButtonTagData = {
    type: '',
    text: '',
    click: ''
  };

  ngOnInit(): void {
    this.tagData.type = (this.tag.attributes as CustomButtonTagData).type;
    this.tagData.text = (this.tag.attributes as CustomButtonTagData).text;
    this.tagData.click = (this.tag.attributes as CustomButtonTagData).click;
  }

  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
