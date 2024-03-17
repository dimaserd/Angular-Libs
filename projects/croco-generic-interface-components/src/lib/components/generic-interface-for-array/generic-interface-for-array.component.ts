import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  GenericInterfaceModalComponent,
  ModalOutput,
} from '../generic-interface-modal/generic-interface-modal.component';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-generic-interface-for-array',
  templateUrl: './generic-interface-for-array.component.html',
  styleUrls: ['./generic-interface-for-array.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceForArrayComponent),
      multi: true,
    },
  ],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class GenericInterfaceForArrayComponent implements OnInit, ControlValueAccessor {
  @Input() interfaceBlock: UserInterfaceBlock;
  interfaces: UserInterfaceBlock[] = [];
  formGroup: UntypedFormGroup;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
  ) {
    this.formGroup = fb.group({});
  }

  ngOnInit() {}

  addInterface(): void {
    this.openDialog();
  }

  openDialog(values = null, indexControl?: number): void {
    const dialogRef = this.dialog.open(GenericInterfaceModalComponent, {
      width: '500px',
      data: { interfaceBlock: this.interfaceBlock, values: values, indexControl: indexControl },
    });

    dialogRef.afterClosed().subscribe((result: ModalOutput) => {
      if (!result || !result.value) return;

      if (isNaN(result.indexControl)) {
        this.formGroup.addControl(this.interfaces.length.toString(), new UntypedFormControl(result.value));
        this.interfaces.push(this.interfaceBlock);
      } else {
        this.formGroup.get(result.indexControl.toString()).setValue(result.value);
      }
      if (this.onChange) {
        this.onChange(this.value);
      }
    });
  }

  editInterface(indexInterface: number) {
    this.openDialog(this.formGroup.get(indexInterface.toString()).value, indexInterface);
  }

  deleteInterface(indexInterface: number) {
    delete this.interfaces[indexInterface];
    this.formGroup.removeControl(indexInterface.toString());
    if (this.onChange) {
      this.onChange(Object.values(this.value));
    }
  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  set value(value) {
    if (!value) value = [];
    const formGroupKeys = Object.keys(this.formGroup.value);
    for (let i in formGroupKeys) {
      if (!value[i]) {
        delete this.interfaces[formGroupKeys[i]];
        this.formGroup.removeControl(formGroupKeys[i].toString());
      }
    }
    for (let i in value) {
      if (!formGroupKeys[i]) {
        this.formGroup.addControl(this.interfaces.length.toString(), new UntypedFormControl(value[i]));
        this.interfaces.push(this.interfaceBlock);
      } else {
        this.formGroup.get(formGroupKeys[i].toString()).setValue(value[i]);
      }
    }
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  get value(): any {
    return Object.values(this.formGroup.value);
  }
}
