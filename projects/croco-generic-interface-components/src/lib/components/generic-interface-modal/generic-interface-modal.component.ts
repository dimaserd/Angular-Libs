import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {CreateValueService} from "../../services/create-value.service";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

export interface ModalOutput {
  value: string;
  indexControl: number;
}

@Component({
  selector: 'app-generic-interface-modal',
  templateUrl: './generic-interface-modal.component.html',
  styleUrls: ['./generic-interface-modal.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ]
})
export class GenericInterfaceModalComponent implements OnInit {
  valueGroup: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<GenericInterfaceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: UntypedFormBuilder,
    private createValueService: CreateValueService,
  ) {}

  ngOnInit() {
    const controls = {};
    for (const block of this.data.interfaceBlock.innerGenericInterface.blocks) {
      controls[block.propertyName] = [
        this.data.values && this.data.values[block.propertyName]
          ? this.data.values[block.propertyName]
          : this.createValueService.createValueInterface(block),
      ];
    }
    this.valueGroup = this.fb.group(controls);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
