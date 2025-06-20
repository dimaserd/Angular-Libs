import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MessageView } from '../../../../models/message-view.interface';

@Component({
  selector: 'ecc-chat-confirm-delete-modal',
  templateUrl: './chat-confirm-delete-modal.component.html',
  styleUrls: ['./chat-confirm-delete-modal.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConfirmDeleteModalComponent {
  public dialogRef: DialogRef<boolean> = inject(DialogRef);
  public message: MessageView = inject(DIALOG_DATA);
}
