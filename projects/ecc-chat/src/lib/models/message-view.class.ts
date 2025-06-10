import {ChatMessageModel} from '../services/ChatMessagingService';
import { ticksToDate } from '../utils/base/ticks-to-date';

export class MessageViewClass {
  private readonly _date: Date | null;
  private readonly _isOutgoing: boolean;
  constructor(
    private message: ChatMessageModel,
    private currentUserId: string,
  ) {
    this._isOutgoing = this.currentUserId === this.message.senderUserId;
    this._date = ticksToDate(this.message.sentOnUtcTicks);
  }

  public get isOutgoing(): boolean {
    return this._isOutgoing;
  }

  public get date(): Date {
    return this._date;
  }

  public get id(): string {
    return this.message.id;
  }

  public get sentOnUtcTicks(): number {
    return this.message.sentOnUtcTicks;
  }

  public get messageText(): string {
    return this.message.message;
  }
}
