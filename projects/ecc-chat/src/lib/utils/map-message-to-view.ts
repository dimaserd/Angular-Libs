import { MessageView } from '../models/message-view.interface';
import { ChatMessageModel } from '../services/ChatMessagingService';
import { ticksToDate } from './base/ticks-to-date';
import { format } from 'date-fns';

export function mapMessageToView(message: ChatMessageModel): MessageView {
  const date = ticksToDate(message.sentOnUtcTicks);
  return {
    message: message,
    date,
    dayId: format(date, 'yyyy.MM.dd')
  };
}
