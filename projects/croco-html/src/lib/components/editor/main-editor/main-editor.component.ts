import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';

@Component({
  selector: 'croco-html-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css']
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

  constructor(private _clipboardService: ClipboardService,
    private _snackBar: MatSnackBar,
    private _cdref: ChangeDetectorRef) { }
  
  ngAfterViewInit(): void {
    this.recalculateBodyTags();
  }

  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  visualEditorRenderedHandler(){
    this.visualEditorRendered = true;
    this.recalculateBodyTags();
  }

  onHtmlChangedHandler(html: string) {
    this.html = html;
    this.onHtmlChanged.emit(html);
  }

  textAreaModelChangedHandler(){
    this.recalculateBodyTags();
    this.onHtmlChangedHandler(this.html);
  }

  recalculateBodyTags() {
    this.visualEditor.html = this.html;
    this.visualEditor.recalculateBodyTags();
  }

  copyMarkUp() {
    this._snackBar.open("Разметка скопирована в буфер обмена", "Закрыть", { duration: 1500 });
    this._clipboardService.copy(this.html);
  }

  ngOnInit(): void {
    this.visualEditor.recalculateBodyTags();
  }
}
