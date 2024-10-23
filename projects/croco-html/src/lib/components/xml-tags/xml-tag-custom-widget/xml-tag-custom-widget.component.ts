import {Component, Input} from '@angular/core';
import {CustomWidgetTagData} from "../../../extensions";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'croco-html-xml-tag-custom-widget',
  templateUrl: './xml-tag-custom-widget.component.html',
  styleUrls: ['./xml-tag-custom-widget.component.css'],
  imports: [MatTooltip],
  standalone: true
})

export class XmlTagCustomWidgetComponent {
  @Input()
  public set tagData(value: CustomWidgetTagData) {
    this._tagData = value;
    this.tooltipData = `data-id:${value.dataId}; widget-id: ${value.widgetId}`;
  };

  public get tagData(): any {
    return this._tagData;
  }

  public _tagData: CustomWidgetTagData;
  public tooltipData: string = "";
}
