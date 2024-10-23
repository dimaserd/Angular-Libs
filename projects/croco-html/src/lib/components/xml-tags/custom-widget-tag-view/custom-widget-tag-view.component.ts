import {Component, computed, input, Signal} from '@angular/core';
import {CustomWidgetTagData} from "../../../extensions";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'croco-html-custom-widget-tag-view',
  templateUrl: './custom-widget-tag-view.component.html',
  styleUrls: ['./custom-widget-tag-view.component.css'],
  imports: [MatTooltip],
  standalone: true
})
export class CustomWidgetTagViewComponent {

  tagData = input.required<CustomWidgetTagData>();

  tooltipData: Signal<string> = computed(() => `data-id:${this.tagData().dataId}; widget-id: ${this.tagData().widgetId}`);
}
