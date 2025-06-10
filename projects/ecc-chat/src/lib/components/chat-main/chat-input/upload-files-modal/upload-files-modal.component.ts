import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { InputMessage } from '../../../../models/input-message.interface';
import { PluralizePipe } from '../../../../pipes/pluralize.pipe';
import { ChatFileViewComponent } from '../../chat-file-view/chat-file-view.component';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { pasteIntoTextArea } from '../../../../utils/paste-into-text-area';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'app-upload-files-modal',
  templateUrl: './upload-files-modal.component.html',
  styleUrls: ['./upload-files-modal.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PluralizePipe, ChatFileViewComponent, FormsModule, TextFieldModule, ChatSymbolSpritePipe
  ]
})
export class UploadFilesModalComponent {
  public dialogRef: DialogRef<InputMessage | void> = inject(DialogRef);
  public message: InputMessage = inject(DIALOG_DATA);

  public textareaKeyDown(event: KeyboardEvent): void {
    if (event.isTrusted && event.key === 'Enter') {
      event.preventDefault();
      if ([event.ctrlKey, event.shiftKey].filter(Boolean).length === 1 && !event.altKey) {
        pasteIntoTextArea(event.target as HTMLTextAreaElement, '\n');
      } else if (this.message?.text || this.message?.files?.length) {
        this.submit();
      }
    }
  }

  public submit(): void {
    if (this.message?.text || this.message?.files?.length) {
      this.dialogRef.close(this.message);
    }
  }

  public changeMessageText(text: string): void {
    this.message = { ...this.message, text };
  }
}
