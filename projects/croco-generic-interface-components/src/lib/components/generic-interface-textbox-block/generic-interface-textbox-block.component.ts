import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {UserInterfaceType} from "../../models/UserInterfaceType";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-generic-interface-textbox-block',
  templateUrl: './generic-interface-textbox-block.component.html',
  styleUrls: ['./generic-interface-textbox-block.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceTextboxBlockComponent),
      multi: true,
    },
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class GenericInterfaceTextboxBlockComponent implements OnInit, ControlValueAccessor, OnDestroy {
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor() {
    this.subscribe = this.valueControl.valueChanges.subscribe((v) => {
      if (this.onChange) {
        this.onChange(this.getInput() === 'number' && v !== null && v !== undefined ? +v : v);
      }
    });
  }

  step: number = null;
  inputType: string;
  hidden: boolean;

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  ngOnInit() {
    this.inputType = this.getInput();
    this.hidden = this.interfaceBlock.interfaceType === UserInterfaceType.Hidden;
  }

  private getInput(): string {
    if (this.interfaceBlock.interfaceType === UserInterfaceType.TextBox) {
      return 'text';
    }

    if (this.interfaceBlock.interfaceType === UserInterfaceType.NumberBox) {
      if (this.interfaceBlock.numberBoxData.isInteger) {
        this.step = 1;
      }
      return 'number';
    }

    return 'password';
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
    this.valueControl.setValue(value);
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value(): any {
    return this.valueControl.value;
  }
}
