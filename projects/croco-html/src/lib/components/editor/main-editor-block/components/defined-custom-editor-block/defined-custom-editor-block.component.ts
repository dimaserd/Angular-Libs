import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HtmlBodyTag } from '../../../../../models';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [JsonPipe],
  templateUrl: './defined-custom-editor-block.component.html',
  styleUrl: './defined-custom-editor-block.component.css'
})
export class DefinedCustomEditorBlockComponent {
  @Input({ required: true })
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();
}
