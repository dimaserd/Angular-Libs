import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-generic-interface-multiple-dropdown-list',
  templateUrl: './generic-interface-multiple-dropdown-list.component.html',
  styleUrls: ['./generic-interface-multiple-dropdown-list.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceMultipleDropdownListComponent),
      multi: true,
    },
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgForOf
  ]
})
export class GenericInterfaceMultipleDropdownListComponent implements OnInit, ControlValueAccessor, OnDestroy {
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;
  selectValues: string[] = ['"Value 3"'];

  constructor() {}

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  ngOnInit() {
    const value = this.interfaceBlock.dropDownData.selectList.filter((x) => x.selected).map((x) => x.value);
    this.value = value;
    this.subscribe = this.valueControl.valueChanges.subscribe((v) => {
      if (this.onChange) {
        this.onChange(v);
      }
    });
  }

  writeValue(obj: string[]): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  set value(value) {
    this.valueControl.setValue(value);
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value(): string[] {
    return this.valueControl.value;
  }
}
