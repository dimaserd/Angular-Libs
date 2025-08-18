import { Component, ComponentRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HtmlBodyTag, TagEditorService } from '../../../../../models';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [],
  templateUrl: './defined-custom-editor-block.component.html'
})
export class DefinedCustomEditorBlockComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  public _tagService: TagEditorService;
  public _tag: HtmlBodyTag;

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._tagService = data;

    this._tagService.tag$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(tag => {
        this._tag = tag;
      });
  }

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  getCustomComponent() {
    const tagName = this._tag.tagDescription.tag;

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

      this.dynamicContainerRef.setInput("tagService", this._tagService);
    }
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();

    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

