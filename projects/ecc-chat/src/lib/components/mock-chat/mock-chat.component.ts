import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IChatsListItem } from '../../models/chats-list-item.interface';
import { ChatService } from '../../services/ChatService';
import { Dialog } from '@angular/cdk/dialog';
import { switchMap } from 'rxjs/operators';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { ChatMessengerComponent } from '../chat-messenger/chat-messenger.component';

@Component({
  selector: 'app-mock-chat',
  templateUrl: './mock-chat.component.html',
  styleUrls: ['./mock-chat.component.scss'],
  standalone: true,
  imports: [
    ChatMessengerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockChatComponent {
  public userId: string = '1770ddc9-120e-461c-ac71-b2df32707ae8';

  public chatId$: Observable<number>;
  public mockChatList: IChatsListItem[] = [];
  constructor(
    private readonly _chatService: ChatService,
    private dialog: Dialog,
  ) { }

  public changeUser(userId: string): void {
    this.userId = userId;
  }

  public getChat(): void {
    if (this.userId) {
      this._chatService
        .getOrCreateDialog(this.userId)
        .pipe(switchMap((chat) => this.dialog.open(ChatModalComponent, { data: chat.chatId }).closed))
        .subscribe();
    }
  }
}
