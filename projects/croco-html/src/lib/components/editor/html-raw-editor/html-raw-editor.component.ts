import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TagEditorService } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'croco-html-html-raw-editor',
  templateUrl: './html-raw-editor.component.html',
  styleUrls: ['../external-video-editor/external-video-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FormsModule
  ]
})
export class HtmlRawEditorComponent {

  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _sanitizer = inject(DomSanitizer);


  public _data: HtmlBodyTag;
  public _tagService: TagEditorService;

  public presentOrEdit = true;
  public safeHtml: SafeHtml | null = null;


  _tag: HtmlBodyTag;

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._tagService = data;

    this._tagService.tag$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(tag => {
        this._tag = tag;

        this.onHtmlChanged();
      });

    this._tagService.presentOrEdit$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(val => {
        this.presentOrEdit = val;
        this._cdr.markForCheck();
      })
  }

  onHtmlChanged() {
    this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this._tag.innerHtml);
    this._cdr.markForCheck();
  }
}
