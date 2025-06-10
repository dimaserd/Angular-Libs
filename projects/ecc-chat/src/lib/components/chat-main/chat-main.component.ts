import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnDestroy,
  Output,
} from '@angular/core';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeMapperPipe } from '../../pipes/pipe-mapper.pipe';
import { ChatLogicService } from '../../services/ChatLogicService';
import { ChatInputBoxComponent } from './chat-input/chat-input-box/chat-input-box.component';
import { ChatHeaderComponent } from './chat-input/chat-header/chat-header.component';
import { InputMessage } from '../../models/input-message.interface';

@Component({
  selector: 'ecc-chat-main',
  standalone: true,
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    PipeMapperPipe,
    ChatMessagesComponent,
    ChatInputBoxComponent,
    ChatHeaderComponent
  ],
})
export class ChatMainComponent implements OnDestroy {
  @Output()
  public closeChat = new EventEmitter<void>();

  @Input()
  public showCloseChatButton = false;

  public newMessage: InputMessage;

  @Input()
  public set chatId(value: number | undefined) {
    this.initChat(value)
  }

  constructor(readonly _chatLogicService: ChatLogicService) { }
  
  ngOnDestroy(): void {
    this._chatLogicService.closeChatLogic();
  }

  public initChat(id: number): void {
    if(id !== undefined && id !== null) {
      this._chatLogicService.initChatLogic(id)
    }
  }

  public hasChatId(chatId: number | undefined): boolean {
    return typeof chatId === 'number';
  }
}
