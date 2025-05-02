import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { CrocoHtmlFileOptionsService } from "../../../services/CrocoHtmlFileOptionsService";

@Component({
  selector: 'croco-html-html-editor-settings-modal',
  standalone: true,
  imports: [
    MatInput,
    MatCheckbox,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './html-editor-settings-modal.component.html',
  styleUrl: './html-editor-settings-modal.component.scss'
})
export class HtmlEditorSettingsModalComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<HtmlEditorSettingsModalComponent>,
    private readonly _htmlSettingsService: CrocoHtmlFileOptionsService
  ) {
    this.form = this.fb.group({
      usePrivateFiles: false,
      applicationId: ''
    });
  }

  ngOnInit() {
    this.form.patchValue(this._htmlSettingsService.get())
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setSettings(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
