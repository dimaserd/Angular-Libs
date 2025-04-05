import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { HtmlViewComponent } from "../../html-view/html-view.component";
import { SpriteIconPathPipe } from "../../../pipes/sprite-icon-path.pipe";

@Component({
  selector: 'croco-html-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css'],
  standalone: true,
  imports: [
    MatTabsModule,
    VisualEditorComponent,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FormsModule,
    MatButton,
    MatCardModule,
    HtmlViewComponent,
    SpriteIconPathPipe
  ]
})
export class MainEditorComponent implements OnInit, AfterContentChecked, AfterViewInit {

  visualEditorRendered = false;

  @ViewChild("visualEditor", { static: true })
  visualEditor: VisualEditorComponent;

  @Input()
  showMarkUp = true;

  @Input()
  useHtmlRaw = false;

  @Input()
  @Output()
  html: string = "";

  @Output()
  onHtmlChanged = new EventEmitter<string>();

  constructor(private readonly _clipboardService: ClipboardService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cdref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.recalculateBodyTags();
  }

  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  visualEditorRenderedHandler() {
    this.visualEditorRendered = true;
    this.recalculateBodyTags();
  }

  onHtmlChangedHandler(html: string) {
    this.html = html;
    this.onHtmlChanged.emit(html);
  }

  textAreaModelChangedHandler() {
    this.recalculateBodyTags();
    this.onHtmlChangedHandler(this.html);
  }

  recalculateBodyTags() {
    this.visualEditor.html = this.html;
    this.visualEditor.recalculateBodyTags();
    this._cdref.markForCheck();
  }

  copyMarkUp() {
    this._snackBar.open("Разметка скопирована в буфер обмена", "Закрыть", { duration: 1500 });
    this._clipboardService.copy(this.html);
  }

  ngOnInit(): void {
    this.visualEditor.recalculateBodyTags();
  }
}
