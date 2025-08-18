import { Component, Input, OnDestroy } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { TagEditorService } from '../../../models';
import { TextAlignment, TextTagDataConsts } from '../../../tag-services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'croco-html-text-editor',
  templateUrl: './text-editor.component.html',
  standalone: true,
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

  private unsubscribe = new Subject<void>();

  _tag: HtmlBodyTag;
  _tagService: TagEditorService;

  @Input({ required: true })
  set tagService(data: TagEditorService) {
    this._tagService = data;

    this._tagService.tag$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(tag => {
        this._tag = tag;
      });

    this._tagService.presentOrEdit$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(val => {
        this.presentOrEdit = val;
      });

    this._horizontalAlignment = this._tag.attributes.hasOwnProperty(TextTagDataConsts.HAlign)
      ? this._tag.attributes[TextTagDataConsts.HAlign]
      : TextAlignment.Left
  }

  presentOrEdit = true;

  public TextAlignment = TextAlignment;

  public _horizontalAlignment: TextAlignment = TextAlignment.Left;

  changeData() {
    this._tag.attributes[TextTagDataConsts.HAlign] = this._horizontalAlignment;

    this._tagService.tag$.next(this._tag);
  }

  getInnerHtml() {
    return `<${this._tag.tagDescription.tag}>${this._tag.innerHtml}<${this._tag.tagDescription.tag}/>`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
