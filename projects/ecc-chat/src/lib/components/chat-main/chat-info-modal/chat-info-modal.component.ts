import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChatShortInfoComponent } from '../chat-short-info/chat-short-info.component';
import { ChatDetailedModel, EccUserModel } from '../../../services/ChatService';
import { PipeMapperPipe } from '../../../pipes/pipe-mapper.pipe';
import { getAvatarText } from '../../../utils/base/get-avatar-text';
import { ChatSymbolSpritePipe } from '../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'app-chat-info-modal',
  templateUrl: './chat-info-modal.component.html',
  styleUrls: ['./chat-info-modal.component.scss'],
  standalone: true,
  imports: [ChatShortInfoComponent, PipeMapperPipe, ChatSymbolSpritePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInfoModalComponent {
  public dialogRef: DialogRef = inject(DialogRef);

  public chatInfo?: ChatDetailedModel = inject(DIALOG_DATA);

  public getAvatarText(user: EccUserModel): string {
    return getAvatarText(user);
  }
}
