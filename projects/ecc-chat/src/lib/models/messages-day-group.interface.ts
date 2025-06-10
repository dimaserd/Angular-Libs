import { MessagesSenderGroup } from "./messages-sender-group.interface";

export interface MessagesDayGroupInterface {
  id: string;
  messagesGroups: MessagesSenderGroup[];
  date: Date;
}
