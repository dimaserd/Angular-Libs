import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HtmlBodyTag, TagEditorService } from 'croco-html';
import { LinkTagAttrs, LinkTagData } from 'croco-html';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'croco-html-file-link-editor',
  imports: [MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './link-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkEditorComponent {

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  linkData: LinkTagData = {
    url: '',
    title: 'Текст ссылки',
    type: null,
    fileId: null
  }

  public isValid = true;
  public errorMessage = "";

  public _data: HtmlBodyTag;
  public _tagService: TagEditorService;

  public presentOrEdit = true;

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._tagService = data;

    this._tagService.tag$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(tag => {
        this._data = tag;

        this.linkData.url = this._data.attributes[LinkTagAttrs.Url];
        this.linkData.title = this._data.attributes[LinkTagAttrs.Title];
        this.linkData.type = this._data.attributes[LinkTagAttrs.Type];

        this.validate();
        this._cdr.markForCheck();
      })

    this._tagService.presentOrEdit$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(val => {
        this.presentOrEdit = val;
        this._cdr.markForCheck();
      })
  }

  validate() {
    if (!this.linkData.url || this.linkData.url.length === 0){
      this.errorMessage = "Ссылка не указана";
      this.isValid = false;
      return;
    }

    if (!this.linkData.title || this.linkData.title.length === 0){
      this.errorMessage = "Название ссылки не указано";
      this.isValid = false;
      return;
    }

    this.isValid = true;
  }

  saveTag() {

    const attrs = {
      [LinkTagAttrs.Url]: this.linkData.url,
      [LinkTagAttrs.Title]: this.linkData.title,
      [LinkTagAttrs.Type]: this.linkData.type,
      [LinkTagAttrs.FileId]: this.linkData.fileId,
    };

    this._data.attributes = attrs;
    this._tagService.tag$.next(this._data);
  }
}
