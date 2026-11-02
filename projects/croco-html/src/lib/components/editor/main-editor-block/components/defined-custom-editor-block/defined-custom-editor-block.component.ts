import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, inject, Inject, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HtmlBodyTag, TagEditorService } from '../../../../../models';
import { CrocoHtmlOptions } from '../../../../../options';
import { CrocoHtmlOptionsToken } from '../../../../../consts';
import { DefaultTags } from '../../../visual-editor/DefaultTags';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'croco-html-defined-custom-editor-block',
  imports: [],
  templateUrl: './defined-custom-editor-block.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinedCustomEditorBlockComponent implements OnInit, OnDestroy {

  private readonly _cdr = inject(ChangeDetectorRef);

  private readonly _destroy$ = new Subject<void>();
  private _tagServiceSub$ = new Subject<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public useDynamicComponent = false;

  public dynamicContainerRef: ComponentRef<any>;

  public _tagService: TagEditorService;
  public _tag: HtmlBodyTag;

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._tagServiceSub$.next();

    this._tagService = data;

    this._tagService.tag$
      .pipe(takeUntil(this._tagServiceSub$))
      .subscribe(tag => {
        this._tag = tag;
        this._cdr.markForCheck();
      });

    if (this.dynamicContainerRef) {
      this.dynamicContainerRef.setInput("tagService", this._tagService);
    }

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
    this._tagServiceSub$.next();
    this._tagServiceSub$.complete();
    this._destroy$.next();
    this._destroy$.complete();
    this.dynamicContainerRef?.destroy();
  }
}

