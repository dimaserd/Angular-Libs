import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HtmlBodyTag } from '../../../models/models';

@Component({
  selector: 'croco-html-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  myForm = new FormGroup({
    "innerHtml": new FormControl()
  });

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor() { }

  ngOnInit(): void {
  }

  getInnerHtml(){
    return `<${this.tag.tagDescription.tag}>${this.tag.innerHtml}<${this.tag.tagDescription.tag}/>`;
  }
}
