import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { IChatsListItem } from '../../../../models/chats-list-item.interface';
import { PipeMapperPipe } from '../../../../pipes/pipe-mapper.pipe';
import { format, isThisWeek, isThisYear, isToday } from 'date-fns';
import { TicksToDatePipe } from "../../../../pipes/ticks-to-date.pipe";
import { getIconText } from '../../../../utils/base/get-icon-text';

@Component({
  selector: 'ecc-chats-list-item',
  templateUrl: './chats-list-item.component.html',
  styleUrls: ['./chats-list-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, PipeMapperPipe, TicksToDatePipe, AsyncPipe],
})
export class ChatsListItemComponent {
  @Input() public chatInfo: IChatsListItem;
  @Input() public isActive = false;

  @Output() public openChat = new EventEmitter<void>();

  public formatDate(date: number | Date): string {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (
      isThisWeek(date, {
        weekStartsOn: 1,
      })
    ) {
      return format(date, 'E');
    } else if (isThisYear(date)) {
      return format(date, 'MMM d');
    } else {
      return format(date, 'P');
    }
  }

  public getIconText(chatName: string): string {
    return getIconText(chatName);
  }
}
