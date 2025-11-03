import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
  DestroyRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MessageView } from '../../../models/message-view.interface';
import { Dialog } from '@angular/cdk/dialog';
import { InputMessage } from '../../../models/input-message.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UploadFilesModalComponent } from './upload-files-modal/upload-files-modal.component';
import { ChatMessageAttachmentFileModel } from '../../../services/ChatMessagingService';
import { PipeMapperPipe } from '../../../pipes/pipe-mapper.pipe';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ChatLogicService } from '../../../services/ChatLogicService';
import { AsyncPipe } from '@angular/common';
import { pasteIntoTextArea } from '../../../utils/paste-into-text-area';
import { ChatSymbolSpritePipe } from '../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'ecc-chat-input',
  standalone: true,
  imports: [TextFieldModule, FormsModule, PipeMapperPipe, AsyncPipe, ChatSymbolSpritePipe],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChatInputComponent,
    },
  ],
})
export class ChatInputComponent implements ControlValueAccessor, OnChanges {

  @Output() public submitText = new EventEmitter<void>();
  @Output() public cancelEditEvent = new EventEmitter<void>();
  @ViewChild('fileInput') public fileInputRef: ElementRef<HTMLInputElement>;
  public message: InputMessage = {
    text: '',
    files: undefined,
  };

  public onChange: (value: InputMessage) => void;
  public onTouched: () => void;

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly dialog: Dialog = inject(Dialog);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public editData$: BehaviorSubject<MessageView | undefined | null> = new BehaviorSubject(null);

  constructor(readonly _chatLogicService: ChatLogicService,) {
    this.editData$ = _chatLogicService.editableMessage$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('editableMessage' in changes && this.editData$.getValue() !== undefined) {
      this.message = {
        text: this.editData$.getValue().message.message,
      };
      this.onChange?.(this.message);
    }
  }

  cancelEdit() {
    if (this.editData$.getValue()) {
      this.cancelEditEvent.emit();
    }
  }

  public emitFiles(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.cancelEdit()

    if (!files) {
      return;
    }
    this.openUploadFilesModal({ ...this.message, files: [...(this.message?.files ?? []), ...Array.from(files)] })
      .pipe(
        tap(() => {
          if (this.fileInputRef) {
            // eslint-disable-next-line functional/immutable-data
            this.fileInputRef.nativeElement.value = '';
          }
        }),
        filter(val => val !== undefined && val !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((message) => {
        this.message = message;
        this.onChange?.(this.message);
        this.submitText.emit();
      });
  }

  public textareaKeyDown(event: KeyboardEvent): void {
    if (event.isTrusted && event.key === 'Enter') {
      event.preventDefault();
      if ([event.ctrlKey, event.shiftKey].filter(Boolean).length === 1 && !event.altKey) {
        pasteIntoTextArea(event.target as HTMLTextAreaElement, '\n');
      } else {
        this.submitText.emit();
      }
    }
  }

  public changeMessageText(text: string): void {
    this.message = { ...this.message, text };
    this.onChange?.(this.message);
  }

  public registerOnChange(fn: (value: InputMessage) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: InputMessage): void {
    this.message = value;
    this.cdr.detectChanges();
  }

  public printFiles(files: ChatMessageAttachmentFileModel[]): string {
    return files.map((file) => file.fileName).join(', ');
  }

  private openUploadFilesModal(message: InputMessage): Observable<InputMessage | null | undefined> {
    return this.dialog.open<InputMessage | null | undefined>(UploadFilesModalComponent, { data: message }).closed;
  }
}
