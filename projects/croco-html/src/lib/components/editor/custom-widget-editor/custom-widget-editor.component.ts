import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HtmlBodyTag } from "../../../models/models";
import { FormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { XmlTagCustomWidgetComponent } from "../../xml-tags";
import { CustomWidgetTagData, CustomWidgetTagService } from '../../../tag-services/CustomWidgetTagService';

@Component({
  selector: 'croco-html-custom-widget-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    XmlTagCustomWidgetComponent,
  ],
  templateUrl: './custom-widget-editor.component.html'
})
export class CustomWidgetEditorComponent implements OnInit {
  @Input({ required: true })
  tag: HtmlBodyTag;

  @Input({ required: true })
  presentOrEdit = false;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  tagData: CustomWidgetTagData = {
    type: '',
    dataId: '',
    widgetId: ''
  };

  ngOnInit(): void {
    this.tagData = CustomWidgetTagService.ExtractCustomWidgetTagData(this.tag.attributes);
  }

  dataChanged() {
    this.tag.attributes = CustomWidgetTagService.ExtractCustomWidgetAttributes(this.tagData);
  }
}
