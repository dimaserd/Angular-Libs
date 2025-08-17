import { Component, ComponentRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { HtmlBodyTag, ISingleTagStorage } from '../../../../../models';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [],
  templateUrl: './defined-custom-editor-block.component.html'
})
export class DefinedCustomEditorBlockComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  public _tagStorage: ISingleTagStorage;
  public _tag: HtmlBodyTag;

  @Input({ required: true })
  set tagStorage(data: ISingleTagStorage) {
    this._tagStorage = data;
    this._tag = this._tagStorage.get();
  }

  @Input({ required: true })
  public presentOrEdit = false;

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  getCustomComponent() {

    const tag = this._tagStorage.get();

    const tagName = tag.tagDescription.tag;

    if (this._options.definedCustomTagViewRenderers.hasOwnProperty(tagName)) {
      return this._options.definedCustomTagViewRenderers[tagName].editorComponent;
    }

    return null;
  }

  ngOnInit(): void {

    var component = this.getCustomComponent();

    if (component) {
      this.useDynamicComponent = true;
      this.viewContainerRef.remove();
      this.dynamicContainerRef = this.viewContainerRef.createComponent(component);
      
      this.dynamicContainerRef.setInput("tagStorage", this.tagStorage);
      this.dynamicContainerRef.setInput("presentOrEdit", this.presentOrEdit);
    }
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();
  }
}

