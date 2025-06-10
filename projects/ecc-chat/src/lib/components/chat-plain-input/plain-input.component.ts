import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChatSymbolSpritePipe } from '../../pipes/chat-symbol-sprite.pipe';
import { EccChatSpriteIdsType } from '../../../chat-sprite-ids.type';


@Component({
  selector: 'app-chat-plain-input',
  templateUrl: './plain-input.component.html',
  styleUrls: ['./plain-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, FormsModule, TextFieldModule, ChatSymbolSpritePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlainInputComponent),
      multi: true,
    },
  ],
})
export class PlainInputComponent<T> implements ControlValueAccessor {
  @Input() public label?: string;
  @Input() public type = 'text';
  @HostBinding('class.invalid') @Input() public invalid = false;
  // @Input() public buttonIcon?: SpriteIdsType;
  @Input() public buttonIcon?: EccChatSpriteIdsType;
  @Input() public buttonAriaLabel?: string;

  @Output() public inputButtonClick = new EventEmitter<void>();

  @ViewChild('nativeInput', { static: false })
  public nativeInputRef?: ElementRef<HTMLInputElement>;

  public value?: T;
  public disabled = false;
  public focused = false;

  public onChange?: (value: T | undefined) => void;
  public onTouch?: () => void;

  @HostBinding('class.with-label') public get withLabel(): boolean {
    return Boolean(this.label);
  }

  constructor(private cdr: ChangeDetectorRef) { }
  registerOnChange(fn: (value: T | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: T): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  public updateFocusState(focused: boolean): void {
    this.focused = focused;
    if (!focused) {
      this.onTouch?.();
    }
  }

  public changeMainInput(value: T): void {
    this.value = value;
    this.onChange?.(this.value);
  }
}
