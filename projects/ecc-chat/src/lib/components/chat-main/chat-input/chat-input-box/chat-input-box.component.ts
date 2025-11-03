import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ChatInputComponent } from '../chat-input.component';
import { ChatLogicService } from '../../../../services/ChatLogicService';
import { InputMessage } from '../../../../models/input-message.interface';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ecc-chat-input-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatInputComponent,
    ChatSymbolSpritePipe,
  ],
  templateUrl: './chat-input-box.component.html',
  styleUrl: './chat-input-box.component.scss',
})
export class ChatInputBoxComponent implements AfterViewInit {
  constructor(readonly _chatLogicService: ChatLogicService) {}

  public chatControlForm = new FormGroup({
    message: new FormControl<InputMessage>(
      { text: '', files: undefined },
      this.messageInputValidator.bind(this)
    ),
  });

  @Input() draftMessage: InputMessage | null = null;

  @Output() public sendNewMessageEvent = new EventEmitter<InputMessage>();

  @Output() public draftMessageEvent = new EventEmitter<InputMessage>();

  ngAfterViewInit(): void {

    const messageControl = this.chatControlForm.controls['message'];

    if (this.draftMessage) {
      messageControl.patchValue(this.draftMessage, {
        emitEvent: false,
      });
    }
    this._chatLogicService.editableMessage$.subscribe((message) => {
      if (message?.message?.message) {
        messageControl.patchValue(
          { text: message?.message?.message, files: undefined },
          {
            emitEvent: false,
          }
        );
      }
    });
    messageControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((message) => {
        this.draftMessageEvent.emit(message);
      });
  }

  public messageInputValidator({
    value,
  }: AbstractControl): ValidationErrors | null {
    return !value.text &&
      !value.files?.length &&
      !this._chatLogicService.editableMessage$?.getValue()
      ? { required: true }
      : null;
  }

  public sendMessage(): void {
    if (
      !this.chatControlForm.valid ||
      (this.chatControlForm.value?.message?.text || '').trim().length === 0
    ) {
      return;
    }
    const { message } = this.chatControlForm.value;
    this.chatControlForm.reset({ message: { text: '', files: undefined } });
    this._chatLogicService.editableMessage$.getValue()
      ? this._chatLogicService.sendAfterEdit(message.text)
      : this.sendNewMessage(message);
  }

  private sendNewMessage(message: InputMessage): void {
    this.sendNewMessageEvent.emit(message);
  }

  public cancelEdit(): void {
    this._chatLogicService.editableMessage$.next(null);
    this.chatControlForm.reset({ message: { text: '', files: undefined } });
  }
}
