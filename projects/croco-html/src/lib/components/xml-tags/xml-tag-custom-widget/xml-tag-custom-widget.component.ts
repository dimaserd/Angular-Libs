import {
  Component,
  ComponentRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatTooltip } from "@angular/material/tooltip";
import { CrocoHtmlOptionsToken } from "../../../consts";
import { CrocoHtmlOptions } from "../../../options";
import { CustomWidgetTagData } from '../../../tag-services/CustomWidgetTagService';

@Component({
  selector: 'croco-html-xml-tag-custom-widget',
  templateUrl: './xml-tag-custom-widget.component.html',
  styleUrls: ['./xml-tag-custom-widget.component.css'],
  imports: [MatTooltip],
  standalone: true
})
export class XmlTagCustomWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  @Input()
  public set tagData(value: CustomWidgetTagData) {
    if (value) {
      this._tagData = value;
      this.tooltipData = `data-id:${value.dataId}; widget-id: ${value.widgetId}`;
      if (this.dynamicContainerRef?.instance) {
        this.dynamicContainerRef.instance.tagData = value;
      }
    }
  };

  public get tagData(): CustomWidgetTagData {
    return this._tagData;
  }

  public _tagData: CustomWidgetTagData;
  public tooltipData: string = "";

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
  ) {
  }

  ngOnInit(): void {
    if (this._options.customWidgetRendererComponent) {
      this.useDynamicComponent = true;
      this.viewContainerRef.remove();
      this.dynamicContainerRef = this.viewContainerRef.createComponent(this._options.customWidgetRendererComponent);
      this.dynamicContainerRef.setInput("tagData", this.tagData);
    }
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();
  }
}
