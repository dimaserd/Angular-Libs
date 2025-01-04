import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {UserInterfaceBlock} from "../../models/UserInterfaceBlock";
import {AutoCompleteSuggestion} from "../../models/AutoCompleteSuggestion";
import {GetAutocompleteDataService} from "../../services/get-autocomplete-data.service";
import {NgSelectModule} from "@ng-select/ng-select";

@Component({
  selector: 'app-generic-interface-autocomplete-multiple',
  templateUrl: './generic-interface-autocomplete-multiple.component.html',
  styleUrls: ['./generic-interface-autocomplete-multiple.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInterfaceAutocompleteMultipleComponent),
      multi: true,
    },
    GetAutocompleteDataService
  ],
  imports: [
    NgSelectModule,
    ReactiveFormsModule,
  ]
})
export class GenericInterfaceAutocompleteMultipleComponent implements OnInit, ControlValueAccessor, OnDestroy {
  valueControl: UntypedFormControl = new UntypedFormControl();
  @Input() interfaceBlock: UserInterfaceBlock;
  onChange: Function;
  onTouched: Function;
  subscribe: Subscription;
  autoCompleteOptions: AutoCompleteSuggestion[];
  searchSubscribe: Subscription;
  searchSubject: Subject<string> = new Subject();
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
    this.searchSubscribe = this.searchSubject
      .asObservable()
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        switchMap((term) => this.getAutocompleteOptions(term)),
      )
      .subscribe((result) => {
        this.autoCompleteOptions = result.filter((x) =>
          this.value ? !this.value.map((x) => x.value).includes(x.value) : true,
        );
        this.loading = false;
      });
  }

  getAutocompleteOptions(term: string): Observable<AutoCompleteSuggestion[]> {
    return this.getAutocompleteDataService
      .getData(term, this.interfaceBlock.autoCompleteData.dataProviderTypeFullName)
      .pipe(
        tap(() => {
          this.loading = false;
        }),
      );
  }

  search(result) {
    this.searchSubject.next(result.term);
  }

  writeValue(obj: any[]): void {
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

  get value(): any[] {
    return this.valueControl.value
      ? this.valueControl.value.map((x) => {
          return { ...x, autocompleteFlag: true };
        })
      : this.valueControl.value;
  }

  compare() {
    return false;
  }

  close() {
    this.autoCompleteOptions = [];
  }
}
