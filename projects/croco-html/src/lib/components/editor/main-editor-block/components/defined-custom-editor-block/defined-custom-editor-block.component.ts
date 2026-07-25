import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, DestroyRef, inject, Inject, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HtmlBodyTag, TagEditorService } from '../../../../../models';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';
import { DefaultTags } from '../../../visual-editor/DefaultTags';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [],
  templateUrl: './defined-custom-editor-block.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinedCustomEditorBlockComponent implements OnInit, OnDestroy {

  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);

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
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(tag => {
        this._tag = tag;
        this._cdr.markForCheck();
      });
    
    this._cdr.markForCheck();
  }

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  ngOnInit(): void {

    var component = DefaultTags.getEditor(this._tag, this._options);

    if (component) {
      this.useDynamicComponent = true;
      this.viewContainerRef.remove();
      this.dynamicContainerRef = this.viewContainerRef.createComponent(component);

      this.dynamicContainerRef.setInput("tagService", this._tagService);
    }

    this._cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.dynamicContainerRef.destroy();
  }
}

