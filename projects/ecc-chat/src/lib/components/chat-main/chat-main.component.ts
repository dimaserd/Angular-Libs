import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
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
import { ChatSettings } from '../../models';

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
    ChatHeaderComponent,
  ],
})
export class ChatMainComponent implements OnDestroy, OnInit {
  @Output()
  public closeChat = new EventEmitter<void>();

  @Output()
  public onFullscreen = new EventEmitter<void>();

  @Output() public draftMessageEvent = new EventEmitter<InputMessage>();

  @Input()
  public showCloseChatButton = false;

  @Input()
  public showFullscreenButton = false;

  @Input()
  public showChatInfo = false;

  @Input()
  public settings: ChatSettings | null = null;

  public newMessage: InputMessage;

  @Input()
  public draftMessage: InputMessage | null = null;

  @Input()
  public set chatId(value: number | undefined) {
    this.initChat(value);
  }

  constructor(readonly _chatLogicService: ChatLogicService) {}

  ngOnDestroy(): void {
    this._chatLogicService.closeChatLogic();
  }

  ngOnInit(): void {
    if (this.settings) {
      this._chatLogicService.setChatSettings(this.settings);
    }
  }

  public initChat(id: number): void {
    if (id !== undefined && id !== null) {
      this._chatLogicService.initChatLogic(id);
    }
  }

  public hasChatId(chatId: number | undefined): boolean {
    return typeof chatId === 'number';
  }
}
