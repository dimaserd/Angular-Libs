import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {crocoHtmlEditorFileOptionsToken} from "../../../consts";

@Component({
  selector: 'lib-editor-settings-modal',
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
  templateUrl: './editor-settings-modal.component.html',
  styleUrl: './editor-settings-modal.component.scss'
})
export class EditorSettingsModalComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditorSettingsModalComponent>,) {
    this.form = this.fb.group({
      usePrivateFiles: false,
      applicationId: ''
    })
  }

  ngOnInit() {
    this.form.patchValue(crocoHtmlEditorFileOptionsToken.value)
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setSettings(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
