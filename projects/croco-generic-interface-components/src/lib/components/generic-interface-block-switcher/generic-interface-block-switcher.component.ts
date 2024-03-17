import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
  GenericInterfaceTextboxBlockComponent
} from "../generic-interface-textbox-block/generic-interface-textbox-block.component";
import {GenericInterfaceTextareaComponent} from "../generic-interface-textarea/generic-interface-textarea.component";

@Component({
  selector: 'app-generic-interface-block-switcher',
  templateUrl: './generic-interface-block-switcher.component.html',
  styleUrls: ['./generic-interface-block-switcher.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceBlockSwitcherComponent),
      multi: true,
    },
  ],
  imports: [
    NgSwitch,
    GenericInterfaceTextboxBlockComponent,
    NgSwitchCase,
    ReactiveFormsModule,
    GenericInterfaceTextareaComponent
  ]
})
export class GenericInterfaceBlockSwitcherComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() interfaceBlock: UserInterfaceBlock;
  valueControl: UntypedFormControl = new UntypedFormControl();
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
