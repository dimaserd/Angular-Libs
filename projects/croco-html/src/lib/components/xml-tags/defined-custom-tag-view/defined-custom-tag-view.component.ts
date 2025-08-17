import { Component, Input } from '@angular/core';
import { InterfaceBlock } from '../../../models/InterfaceBlock';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'croco-html-defined-custom-tag-view',
  imports: [JsonPipe],
  templateUrl: './defined-custom-tag-view.component.html'
})
export class DefinedCustomTagViewComponent {
  @Input({required: true}) public set data(value: InterfaceBlock) {
    this._data = value;
  };

  public _data: InterfaceBlock;
}
