import { Component, ComponentRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { InterfaceBlock } from '../../../models/InterfaceBlock';
import { JsonPipe } from '@angular/common';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../options';
import { HtmlPageDataController } from '../../../services';

@Component({
  selector: 'croco-html-defined-custom-tag-view',
  imports: [JsonPipe],
  templateUrl: './defined-custom-tag-view.component.html'
})
export class DefinedCustomTagViewComponent implements OnInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  @Input({ required: true }) public set data(value: InterfaceBlock) {
    this._data = value;
  };


  @Input({ required: true })
  dataController: HtmlPageDataController;

  public _data: InterfaceBlock;

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {

  }

  getCustomComponent() {

    const tagName = this._data.tagName;

    if (this._options.definedCustomTagViewRenderers.hasOwnProperty(tagName)) {
      return this._options.definedCustomTagViewRenderers[tagName].viewComponent;
    }

    return null;
  }

  ngOnInit(): void {

    var component = this.getCustomComponent();

    if (component) {
      this.useDynamicComponent = true;
      this.viewContainerRef.remove();
      this.dynamicContainerRef = this.viewContainerRef.createComponent(component);
      this.dynamicContainerRef.setInput("data", this._data);
      this.dynamicContainerRef.setInput("dataController", this.dataController);
    }
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();
  }
}
