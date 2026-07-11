import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HtmlBodyTag } from '../../../models/models';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'croco-html-html-raw-editor',
  templateUrl: './html-raw-editor.component.html',
  styleUrls: ['../external-video-editor/external-video-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatLabel, MatInput, CdkTextareaAutosize, FormsModule]
})
export class HtmlRawEditorComponent implements OnChanges {

  private readonly _cdr = inject(ChangeDetectorRef);

  @Input({ required: true })
  tag: HtmlBodyTag;

  @Input({ required: true })
  presentOrEdit = true;

  safeHtml: SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tag'] && changes['tag'].currentValue !== changes['tag'].previousValue) {
      this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.tag.innerHtml);
      this._cdr.markForCheck();
    }
  }

  onSafeHtmlChange(): void {
    this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.tag.innerHtml);
    this._cdr.markForCheck();
  }
}
