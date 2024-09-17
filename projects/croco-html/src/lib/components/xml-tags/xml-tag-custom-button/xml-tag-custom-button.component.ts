import {Component, Input} from '@angular/core';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {CustomButtonTagData} from "../../../extensions/CustomButtonMethods";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'croco-html-xml-tag-custom-button',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './xml-tag-custom-button.component.html',
  styleUrl: './xml-tag-custom-button.component.css'
})
export class XmlTagCustomButtonComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: CustomButtonTagData) {
    this._block = {
      text: value.text,
      type: value.type,
      click: value.click
    }
  };

  public _block: CustomButtonTagData = {
    text: '',
    type: '',
    click: ''
  }
}
