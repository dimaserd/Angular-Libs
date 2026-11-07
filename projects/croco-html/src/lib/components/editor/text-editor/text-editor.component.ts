import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  OnDestroy,
  signal
} from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { TagEditorService } from '../../../models';
import { TextAlignment, TextTagDataConsts } from '../../../tag-services';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'croco-html-text-editor',
  templateUrl: './text-editor.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize
  ]
})
export class TextEditorComponent implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  private _currentService!: TagEditorService;

  readonly tag = signal<HtmlBodyTag | null>(null);

  readonly presentOrEdit = signal(true);

  readonly horizontalAlignment = signal<TextAlignment>(TextAlignment.Left);

  readonly previewHtml = computed(() => {
    const t = this.tag();
    if (!t) return '';
    return `<${t.tagDescription.tag}>${t.innerHtml}<${t.tagDescription.tag}/>`;
  });

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._currentService = data;

    data.tag$.pipe(takeUntil(this._destroy$)).subscribe(t => {
      this.tag.set(t);

      if (t) {
        const align: TextAlignment = t.attributes.hasOwnProperty(TextTagDataConsts.HAlign)
          ? t.attributes[TextTagDataConsts.HAlign] as TextAlignment
          : TextAlignment.Left;
        this.horizontalAlignment.set(align);
      }
    });

    data.presentOrEdit$.pipe(takeUntil(this._destroy$)).subscribe(val => {
      this.presentOrEdit.set(val);
    });
  }

  public readonly TextAlignment = TextAlignment;

  onInnerHtmlChange(): void {
    const tag = this.tag();
    if (tag) {
      this._currentService.tag$.next(tag);
    }
  }

  onAlignmentChange(): void {
    const tag = this.tag();
    if (tag && tag.attributes) {
      tag.attributes[TextTagDataConsts.HAlign] = this.horizontalAlignment();
      this._currentService.tag$.next(tag);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
