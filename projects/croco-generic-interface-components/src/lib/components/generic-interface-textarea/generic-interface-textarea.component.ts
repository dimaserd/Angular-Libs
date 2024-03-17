import { Component, forwardRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-generic-interface-textarea',
  templateUrl: './generic-interface-textarea.component.html',
  styleUrls: ['./generic-interface-textarea.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceTextareaComponent),
      multi: true,
    },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class GenericInterfaceTextareaComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor(private _ngZone: NgZone) {
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
