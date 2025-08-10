import { Component, Input } from '@angular/core';
import { InterfaceBlock } from "../../../extensions/InterfaceBlock";
import { MatButton } from "@angular/material/button";
import { HtmlViewController } from '../../../services/HtmlViewController';
import { ButtonTagData } from '../../../tag-services/ButtonTagService';

@Component({
  selector: 'croco-html-xml-tag-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './xml-tag-button.component.html',
  styleUrl: './xml-tag-button.component.css'
})
export class XmlTagButtonComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: ButtonTagData) {
    this._block = {
      text: value.text,
      type: value.type,
      click: value.click
    }
  };

  constructor(private readonly _controller: HtmlViewController) {
  }

  public _block: ButtonTagData = {
    text: '',
    type: '',
    click: ''
  };

  clickHandler() {
    this._controller.onScriptCalled(this._block.click);
  }
}
