import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {HtmlBodyTag} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CustomWidgetTagData} from "../../../extensions/CustomWidgetMethods";
import {CustomWidgetTagViewComponent} from "../../xml-tags/custom-widget-tag-view/custom-widget-tag-view.component";

@Component({
  selector: 'croco-html-custom-widget-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    CustomWidgetTagViewComponent,
  ],
  templateUrl: './custom-widget-editor.component.html',
  styleUrl: './custom-widget-editor.component.css'
})
export class CustomWidgetEditorComponent implements OnInit {
  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  tagData: CustomWidgetTagData = {
    type: '',
    dataId: '',
    widgetId: ''
  };

  ngOnInit(): void {
    const data = this.tag.attributes as CustomWidgetTagData;

    this.tagData.type = data.type;
    this.tagData.dataId = data.dataId;
    this.tagData.widgetId = data.widgetId;
  }


  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
