import { Component, ComponentRef, Inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';

@Component({
  selector: 'croco-html-custom-widget-icon',
  imports: [],
  templateUrl: './custom-widget-icon.component.html',
  standalone: true
})
export class CustomWidgetIconComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  @Input({ required: true })
  set tagName(tagName: string) {
    this._tagName = tagName;
    this._shortTagName = tagName.substring(0, 2);
  }

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {

  }

  getIconComponent() {
    if (this._options.definedCustomTagViewRenderers.hasOwnProperty(this._tagName)) {
      return this._options.definedCustomTagViewRenderers[this._tagName].iconComponent;
    }

    return null;
  }

  _tagName: string = "";
  _shortTagName: string = "";

  ngOnInit(): void {

    var component = this.getIconComponent();

    if (component) {
      this.useDynamicComponent = true;
      this.viewContainerRef.remove();
      this.dynamicContainerRef = this.viewContainerRef.createComponent(component);
    }
  }
}
