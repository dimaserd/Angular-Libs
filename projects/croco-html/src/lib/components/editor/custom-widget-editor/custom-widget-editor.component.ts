import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HtmlBodyTag} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CustomWidgetMethods, CustomWidgetTagData} from "../../../extensions";
import {CustomWidgetTagViewComponent} from "../../xml-tags";

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
    this.tagData = CustomWidgetMethods.ExtractCustomWidgetTagData(this.tag.attributes);
  }

  linkChanged() {
    this.tag.attributes = CustomWidgetMethods.ExtractCustomWidgetAttributes(this.tagData);
  }
}
