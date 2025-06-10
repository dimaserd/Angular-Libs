import { ChatSettings } from "../models/chat-settings";

export const defaultChatSettings: ChatSettings = {
  lastMessagesUpdateInterval: 4000,
  listResponseCount: 50,
  loadPreviousMessagesWhenMessageVisible: 10,
  visibleMessagesUpdateInterval: 2500,
  chatInfoInterval: 30000,
  canSendFiles: true,
  useSenderNickName: true,
  customButtons:[]
};
