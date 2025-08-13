import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { ChatMainComponent } from '../chat-main/chat-main.component';
import { PipeMapperPipe } from '../../pipes/pipe-mapper.pipe';
import { ChatSettings } from '../../models/chat-settings';
import { ChatLogicService } from '../../services/ChatLogicService';
import { ChatSymbolSpritePipe } from '../../pipes/chat-symbol-sprite.pipe';

export interface ChatModalComponentData {
  chatId: number;
  chatName: string;
  settings?: ChatSettings;
}

@Component({
  selector: 'ecc-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ChatMainComponent, PipeMapperPipe, ChatSymbolSpritePipe]
})
export class ChatModalComponent implements OnInit {
  public dialogRef: DialogRef = inject(DialogRef);
  public data: ChatModalComponentData = inject(DIALOG_DATA);
  private readonly _chatLogicService = inject(ChatLogicService);

  chatId: number = this.data.chatId;

  public hasChatId(chatId: number | undefined): boolean {
    return typeof chatId === 'number';
  }

  ngOnInit() {
    this._chatLogicService.setChatSettings(this.data.settings);
  }
}
