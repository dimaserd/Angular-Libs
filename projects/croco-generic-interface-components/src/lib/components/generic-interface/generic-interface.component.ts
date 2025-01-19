import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormRecord,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import {CreateValueService} from '../../services/create-value.service';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {GenericInterfaceService} from "../../services/generic-interface.service";
import {GenerateGenericUserInterfaceModel} from "../../models/GenerateGenericUserInterfaceModel";
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {UserInterfaceType} from "../../models/UserInterfaceType";
import {DataConverter} from "../../models/DataConverter";
import {NgForOf, NgIf} from "@angular/common";
import {
  GenericInterfaceBlockSwitcherComponent
} from "../generic-interface-block-switcher/generic-interface-block-switcher.component";

interface MainForm {
  [key: string]: any;
}

@Component({
  selector: 'app-generic-interface',
  templateUrl: './generic-interface.component.html',
  styleUrls: ['./generic-interface.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceComponent),
      multi: true,
    },
    GenericInterfaceService
  ],
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    GenericInterfaceBlockSwitcherComponent
  ]
})
export class GenericInterfaceComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() typeDisplayFullNameSubject: Subject<string>;
  @Input() typeDisplayFullName: string;
  @Input() interfaceModel$: Observable<GenerateGenericUserInterfaceModel>;
  @Output() interfaceReady = new EventEmitter<void>();
  interface: GenerateGenericUserInterfaceModel;
  form: FormRecord<FormControl>;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private genericInterfaceService: GenericInterfaceService,
    private fb: FormBuilder,
    private createValueService: CreateValueService,
  ) {}

  ngOnInit(): void {
    if (this.typeDisplayFullName) {
      this.interfaceModel$ = this.genericInterfaceService.getInterfaceByName(this.typeDisplayFullName);
    }

    if (this.typeDisplayFullNameSubject) {
      this.interfaceModel$ = this.typeDisplayFullNameSubject
        .asObservable()
        .pipe(switchMap((typeDisplayFullName) => this.genericInterfaceService.getInterfaceByName(typeDisplayFullName)));
    }

    if (this.interfaceModel$) {
      this.getInterface();
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  openSnackBar() {
    this._snackBar.open('Тип данных не найден', 'Закрыть', {
      duration: 5000,
    });
  }

  public customGetValue(): any {
    const control = this.form as AbstractControl;
    return this.createValueService.createMainValue(control as UntypedFormControl, true);
  }

  public customSetValue(value: any): void {
    const {
      interface: {
        interface: { blocks },
      },
    } = this;
    const redusedValue = {};
    Object.keys(value).map((controlName) => {
      //Установка значения может прилететь в camelCase поэтому переводим в PascalCase
      let controlNameForBlock = controlName[0].toUpperCase() + controlName.substr(1);
      redusedValue[controlNameForBlock] = this.setValueIterator(
        value,
        controlName,
        blocks.find((x) => x.propertyName === controlNameForBlock),
        this.value,
      );
    });

    this.value = redusedValue;
  }

  private setValueIterator(value: any, controlName: string, blockInterface: UserInterfaceBlock, oldValue) {
    if (!blockInterface) {
      throw new Error(`not found interface for ${controlName}`);
    }
    if (
      blockInterface.interfaceType === UserInterfaceType.AutoCompleteForMultiple ||
      blockInterface.interfaceType === UserInterfaceType.AutoCompleteForSingle
    ) {
      return oldValue[controlName];
    }

    if (blockInterface.innerGenericInterface && value[controlName]) {
      const redusedValue = {};
      Object.keys(value[controlName]).map((controlNameChild) => {
        redusedValue[controlNameChild] = this.setValueIterator(
          value[controlName],
          controlNameChild,
          blockInterface.innerGenericInterface.blocks.find((x) => x.propertyName === controlNameChild),
          oldValue ? oldValue[controlName] : {},
        );
      });
      return redusedValue;
    } else {
      return value[controlName];
    }
  }

  getInterface(): void {
    this.form = null;

    this.emitChangeValue();
    this.subscribe = this.interfaceModel$
      .pipe(
        switchMap((res) => {
          this.form = null;

          if (res === null) {
            this.openSnackBar();
            this.interface = null;
            return EMPTY;
          }
          res = new DataConverter(res).ProccessValues();

          this.interface = res;
          const controls: Record<string, [any]> = {};
          for (const block of res.interface.blocks) {
            controls[block.propertyName] = [this.createValueService.createValueInterface(block)];
          }

          this.form = this.fb.group(controls);
          this.emitChangeValue();
          this.interfaceReady.emit();
          return this.form.valueChanges;
        }),
      )
      .subscribe(() => {
        this.emitChangeValue();
      });
  }

  writeValue(obj: MainForm): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  set value(value: MainForm) {
    if (this.form) {
      this.form.patchValue(value);
    }
    this.emitChangeValue();
  }

  emitChangeValue(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  get value(): MainForm {
    return !this.form ? null : this.form.value;
  }
}
