import { getNextId } from './base/get-next-id';
import { EccUserModel } from '../services/ChatService';
import { MessageView } from '../models/message-view.interface';
import { MessagesDayGroupInterface } from '../models/messages-day-group.interface';
import { MessagesSenderGroup } from '../models/messages-sender-group.interface';

export function pushMessages(
  messagesViews: MessageView[],
  oldMessages: MessagesDayGroupInterface[],
  chatUsers: EccUserModel[],
  pushBefore: boolean,
  currentUserId: string,
): MessagesDayGroupInterface[] {
  if (!messagesViews.length) {
    return oldMessages;
  }
  const messagesGroups = groupBySenders(messagesViews, chatUsers, currentUserId);
  return messagesGroups.reduce<MessagesDayGroupInterface[]>((acc, messageGroup) => {
    const nearestDay = acc[pushBefore ? 0 : acc.length - 1];
    if (nearestDay?.id === messageGroup.dayId) {
      const updatedDay = pushGroupToDay(messageGroup, nearestDay, pushBefore);
      return pushBefore ? [updatedDay, ...acc.slice(1)] : [...acc.slice(0, -1), updatedDay];
    } else {
      const newDay: MessagesDayGroupInterface = {
        id: messageGroup.dayId,
        messagesGroups: [messageGroup],
        date: messageGroup.messages[0].date,
      };
      return pushBefore ? [newDay, ...acc] : [...acc, newDay];
    }
  }, oldMessages);
}

function groupBySenders(messages: MessageView[], chatUsers: EccUserModel[], currentUserId: string): MessagesSenderGroup[] {
  return messages.reduce<MessagesSenderGroup[]>((acc, message) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup?.senderId === message.message.senderUserId && lastGroup.dayId === message.dayId) {
      return [...acc.slice(0, -1), { ...lastGroup, messages: [...lastGroup.messages, message] }];
    }
    const senderUserId = message.message.senderUserId;

    return [
      ...acc,
      {
        id: getNextId(),
        messages: [message],
        isOutgoing: currentUserId ===senderUserId,
        senderId: senderUserId,
        sender: chatUsers.find(user => user.id === senderUserId),
        dayId: message.dayId,
      },
    ];

  }, []);
}

function pushGroupToDay(
  messageGroup: MessagesSenderGroup,
  nearestDay: MessagesDayGroupInterface,
  pushBefore: boolean,
): MessagesDayGroupInterface {
  const nearestDayMessagesGroups = nearestDay.messagesGroups;

  const nearestGroup = nearestDayMessagesGroups[pushBefore ? 0 : nearestDayMessagesGroups.length - 1];
  if (nearestGroup?.senderId === messageGroup.senderId) {
    return pushBefore
      ? {
        ...nearestDay,
        messagesGroups: [
          { ...nearestGroup, messages: [...messageGroup.messages, ...nearestGroup.messages] },
          ...nearestDayMessagesGroups.slice(1),
        ],
      }
      : {
        ...nearestDay,
        messagesGroups: [
          ...nearestDayMessagesGroups.slice(0, -1),
          { ...nearestGroup, messages: [...nearestGroup.messages, ...messageGroup.messages] },
        ],
      };
  } else {
    return pushBefore
      ? { ...nearestDay, messagesGroups: [messageGroup, ...nearestDayMessagesGroups] }
      : { ...nearestDay, messagesGroups: [...nearestDayMessagesGroups, messageGroup] };
  }
}
