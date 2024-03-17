import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {AutoCompleteSuggestion} from "../../models/AutoCompleteSuggestion";
import {GetAutocompleteDataService} from "../../services/get-autocomplete-data.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-generic-interface-autocomplete',
  templateUrl: './generic-interface-autocomplete.component.html',
  styleUrls: ['./generic-interface-autocomplete.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceAutocompleteComponent),
      multi: true,
    },
    GetAutocompleteDataService
  ],
  imports: [
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class GenericInterfaceAutocompleteComponent implements OnInit, ControlValueAccessor, OnDestroy {
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;
  autoCompleteOptions: AutoCompleteSuggestion[];
  searchSubscribe: Subscription;
  loading: boolean;

  constructor(private getAutocompleteDataService: GetAutocompleteDataService) {
    this.subscribe = this.valueControl.valueChanges.subscribe((v) => {
      if (this.onChange) {
        this.onChange(this.value);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe();
    if (this.searchSubscribe) this.searchSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.getAutocompleteOptions();
  }

  getAutocompleteOptions({ term = '' } = {}): void {
    if (this.searchSubscribe) this.searchSubscribe.unsubscribe();
    this.loading = true;
    this.searchSubscribe = this.getAutocompleteDataService
      .getData(term, this.interfaceBlock.autoCompleteData.dataProviderTypeFullName)
      .pipe(
        tap(() => {
          this.loading = false;
        }),
      )
      .subscribe((autoCompleteSuggestion) => {
        this.autoCompleteOptions = autoCompleteSuggestion;
      });
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

  public searchFn(term: string, item: unknown): boolean {
    return true;
  }

  set value(value) {
    this.valueControl.setValue(value);
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value(): any {
    return { ...this.valueControl.value, autocompleteFlag: true };
  }
}
