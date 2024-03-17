import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-generic-interface-dropdown-list',
  templateUrl: './generic-interface-dropdown-list.component.html',
  styleUrls: ['./generic-interface-dropdown-list.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceDropdownListComponent),
      multi: true,
    },
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ]
})
export class GenericInterfaceDropdownListComponent implements OnInit, ControlValueAccessor, OnDestroy {
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor() {
    this.subscribe = this.valueControl.valueChanges.subscribe((v) => {
      if (this.onChange) {
        this.onChange(v);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  ngOnInit() {}

  writeValue(obj: string): void {
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

  get value(): string {
    return this.valueControl.value;
  }
}
