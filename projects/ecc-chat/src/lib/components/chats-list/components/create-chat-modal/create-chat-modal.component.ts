import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../../../services/ChatService';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlainInputComponent } from '../../../chat-plain-input/plain-input.component';
import { ButtonTemplateComponent } from '../../../chat-button/button-template/button-template.component';
import { ChatNotifierService } from '../../../../services/notifier/chat-notifier.service';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'app-create-chat-modal',
  templateUrl: './create-chat-modal.component.html',
  styleUrls: ['./create-chat-modal.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlainInputComponent,
    ButtonTemplateComponent,
    ChatSymbolSpritePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChatModalComponent {
  public dialogRef: DialogRef = inject(DialogRef);

  public newChatFormGroup = new FormGroup({
    userId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  public loading = false;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly chatService: ChatService,
    private readonly _notifierService: ChatNotifierService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  public createChat(): void {
    if (this.newChatFormGroup.valid) {
      this.loading = true;
      this.chatService
        .getOrCreateDialog(this.newChatFormGroup.controls.userId.value)
        .pipe(
          switchMap((response) => (response?.succeeded ? [response] : throwError(response))),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe({
          next: (response) => {
            this.dialogRef.close(response.chatId);
          },
          error: (error) => {
            this._notifierService.error({ message: error?.message ?? error?.errorMessage ?? 'Ошибка' });
            this.loading = false;
            this.cdr.detectChanges();
          },
        });
    } else {
      this.newChatFormGroup.controls.userId.markAsTouched();
    }
  }
}
