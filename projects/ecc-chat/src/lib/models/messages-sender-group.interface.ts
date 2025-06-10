import { MessageView } from './message-view.interface';
import { EccUserModel } from '../services/ChatService';

// TODO комментарии
export interface MessagesSenderGroup {
  id: number;
  senderId: string;
  sender?: EccUserModel;
  dayId: string;
  isOutgoing: boolean;
  messages: MessageView[];
}
