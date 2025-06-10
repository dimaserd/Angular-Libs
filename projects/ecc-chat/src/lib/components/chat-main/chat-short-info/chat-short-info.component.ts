import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChatDetailedModel } from '../../../services/ChatService';
import { PipeMapperPipe } from '../../../pipes/pipe-mapper.pipe';
import { InterlocutorService } from '../../../services/interlocutor.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from "@angular/common";
import { getIconText } from '../../../utils/base/get-icon-text';

@Component({
  selector: 'app-chat-short-info',
  templateUrl: './chat-short-info.component.html',
  styleUrls: ['./chat-short-info.component.scss'],
  standalone: true,
  imports: [PipeMapperPipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatShortInfoComponent implements OnChanges {
  @Input() public chatInfo?: ChatDetailedModel;

  public iconPath$?: Observable<string | null>;

  public chatName$?: Observable<string | undefined>;

  constructor(private interlocutorService: InterlocutorService) { }
  ngOnChanges(): void {
    if (this.chatInfo) {
      this.iconPath$ = this.interlocutorService.getInterlocutorAvatar(this.chatInfo.users);
      this.chatName$ = this.interlocutorService.getChatName(this.chatInfo.users, this.chatInfo.chatName);
    } else {
      this.iconPath$ = undefined;
      this.chatName$ = undefined;
    }
  }

  public getIconText(chatName: string): string {
    return getIconText(chatName);
  }
}
