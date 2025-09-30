import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
import { MatDialog } from "@angular/material/dialog";
import { HtmlEditorSettingsModalComponent } from "../html-editor-settings-modal/html-editor-settings-modal.component";
import { CrocoHtmlEditorFileOptions, CrocoHtmlOptions } from "../../../options";
import { MatIcon } from "@angular/material/icon";
import { CrocoHtmlFileOptionsService } from "../../../services/CrocoHtmlFileOptionsService";
import { CrocoHtmlOptionsToken } from '../../../consts';

@Component({
  selector: 'croco-html-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
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
    SpriteIconPathPipe,
    MatIcon
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

  showSettingsButton = false;

  constructor(private readonly _clipboardService: ClipboardService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cdref: ChangeDetectorRef,
    private readonly _dialog: MatDialog,
    private readonly _htmlSettingsService: CrocoHtmlFileOptionsService,
    @Inject(CrocoHtmlOptionsToken) options: CrocoHtmlOptions) {
    this.showSettingsButton = options.showSettingsButton;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['html'].currentValue !== changes['html'].previousValue) {
      this.recalculateBodyTags();
    }
  }

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

  openSettingsModal(): void {
    this._dialog
      .open(HtmlEditorSettingsModalComponent,
        {
          height: '300px',
        })
      .afterClosed()
      .subscribe((data: CrocoHtmlEditorFileOptions) => {
        if (!data) {
          return;
        }

        this._htmlSettingsService.set({
          usePrivateFiles: data.usePrivateFiles,
          applicationId: data.applicationId === '' ? null : data.applicationId,
        })
      })
  }
}
