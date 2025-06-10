import { MessageView } from '../models/message-view.interface';
import { MessagesDayGroupInterface } from '../models/messages-day-group.interface';
import { ChatMessageModel } from '../services/ChatMessagingService';
import { mapMessageToView } from './map-message-to-view';

export function mapAndFilterMessagesBeforePush(
  messages: ChatMessageModel[],
  oldMessages: MessagesDayGroupInterface[],
): MessageView[] {
  const messagesViews = messages.map(mapMessageToView);

  return messagesViews
    .filter(
      (message) =>
        !oldMessages.some(
          (day) =>
            day.id === message.dayId &&
            day.messagesGroups.some(
              (group) => group.senderId === message.message.senderUserId && group.messages.some((item) => item.message.id === message.message.id)
            )
        )
    )
    .sort((a, b) => a.message.sentOnUtcTicks - b.message.sentOnUtcTicks);
}
