import { JsonPipe } from '@angular/common';
import { Component, ComponentRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { HtmlBodyTag, ISingleTagStorage } from '../../../../../models';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [JsonPipe],
  templateUrl: './defined-custom-editor-block.component.html'
})
export class DefinedCustomEditorBlockComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  @Input({ required: true })
  public editor: ISingleTagStorage;


  @Input({ required: true })
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  getCustomComponent() {

    const tagName = this.tag.tagDescription.tag;

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
      
      this.dynamicContainerRef.setInput("tag", this.tag);
      this.dynamicContainerRef.setInput("tagEditor", this.editor);
    }
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();
  }
}

