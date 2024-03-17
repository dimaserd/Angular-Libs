import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup
} from '@angular/forms';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {CreateValueService} from "../../services/create-value.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgForOf, NgIf} from "@angular/common";
import {
  GenericInterfaceBlockSwitcherComponent
} from "../generic-interface-block-switcher/generic-interface-block-switcher.component";

@Component({
  selector: 'app-generic-interface-for-class',
  templateUrl: './generic-interface-for-class.component.html',
  styleUrls: ['./generic-interface-for-class.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceForClassComponent),
      multi: true,
    },
  ],
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    GenericInterfaceBlockSwitcherComponent
  ]
})
export class GenericInterfaceForClassComponent implements OnInit, OnDestroy, ControlValueAccessor, AfterViewInit {
  valueGroup: UntypedFormGroup;
  panelOpenState: boolean = false;
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private createValueService: CreateValueService,
  ) {}

  ngOnInit() {
    const controls = {};
    for (const block of this.interfaceBlock.innerGenericInterface.blocks) {
      controls[block.propertyName] = [this.createValueService.createValueInterface(block)];
    }
    this.valueGroup = this.fb.group(controls);
    this.subscribe = this.valueGroup.valueChanges.subscribe((v) => {
      if (this.onChange) {
        this.onChange(v);
      }
    });
  }

  ngAfterViewInit() {
    timer().subscribe(() => {
      if (this.onChange) {
        this.onChange(this.value);
      }
    });
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
    if (!value) value = {};
    this.valueGroup.patchValue(value);
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value(): any {
    return this.valueGroup.value;
  }
}
