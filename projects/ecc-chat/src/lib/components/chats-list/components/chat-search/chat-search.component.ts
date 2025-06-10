import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ChatSymbolSpritePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChatSearchComponent,
    },
  ],
})
export class ChatSearchComponent implements ControlValueAccessor {
  public value = '';

  public onChange?: (value: string) => void;
  public onTouch?: () => void;

  public disabled = false;

  constructor(private cdr: ChangeDetectorRef) {}
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  public writeValue(value: string): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  public commitValue(value: string): void {
    this.value = value;
    this.onChange?.(value);
  }
}
