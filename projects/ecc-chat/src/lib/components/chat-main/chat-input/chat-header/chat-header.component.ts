import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatLogicService } from '../../../../services/ChatLogicService';
import { ChatShortInfoComponent } from '../../chat-short-info/chat-short-info.component';
import { ChatDetailedModel } from '../../../../services/ChatService';
import { AsyncPipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ChatInfoModalComponent } from '../../chat-info-modal/chat-info-modal.component';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'ecc-chat-header',
  standalone: true,
  imports: [
    ChatShortInfoComponent,
    AsyncPipe,
    ChatSymbolSpritePipe
  ],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  @Output()
  public closeChat = new EventEmitter<void>();

  @Input()
  public showCloseChatButton = false;

  constructor(readonly _chatLogicService: ChatLogicService,
    private dialog: Dialog) {
  }

  public openChatInfo(chatInfo: ChatDetailedModel): void {
    this.dialog.open(ChatInfoModalComponent, { data: chatInfo });
  }
}
