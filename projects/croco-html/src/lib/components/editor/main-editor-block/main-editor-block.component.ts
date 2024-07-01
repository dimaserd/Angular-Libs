import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextMethods } from '../../../extensions/TextMethods';
import { HtmlBodyTag } from '../../../models/models';

@Component({
  selector: 'croco-html-main-editor-block',
  templateUrl: './main-editor-block.component.html',
  styleUrls: ['./main-editor-block.component.css']
})
export class MainEditorBlockComponent implements OnInit {

  textTags = TextMethods.textTags;

  @Input()
  tag:HtmlBodyTag;

  @Output()
  onTagSaved = new EventEmitter<HtmlBodyTag>();

  @Output()
  onTagRemoved = new EventEmitter<HtmlBodyTag>();

  constructor() { }

  tagUpdatedHandler(tag:HtmlBodyTag): void{
  }

  save(){
    this.tag.presentOrEdit = true;
    this.onTagSaved.emit(this.tag);
  }

  deleteItem(){
    this.onTagRemoved.emit(this.tag);
  }

  ngOnInit(): void {
  }
}
