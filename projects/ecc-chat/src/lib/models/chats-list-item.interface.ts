import { Observable } from 'rxjs';
import { ChatMessageSimpleModel } from '../services/ChatService';

export interface IChatsListItem {
  id: number;

  // TODO разобраться зачем здесь Observable и можно ли от него избавиться
  iconPath$?: Observable<string | null>;

  // TODO разобраться зачем здесь Observable и можно ли от него избавиться
  chatName$: Observable<string | null>;
  lastMessage?: ChatMessageSimpleModel;
  unreadMessagesCount?: number;
  muted: boolean;
}
