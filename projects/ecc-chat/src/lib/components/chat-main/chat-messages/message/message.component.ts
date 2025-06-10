import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';
import { TicksToDatePipe } from '../../../../pipes/ticks-to-date.pipe';
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { MessageView } from '../../../../models/message-view.interface';
import { Observable } from 'rxjs';
import { ChatFileViewComponent } from '../../chat-file-view/chat-file-view.component';
import { ChatMessageAttachmentFileModel } from '../../../../services/ChatMessagingService';
import { EccUserModel } from '../../../../services/ChatService';
import { ChatLogicService } from '../../../../services/ChatLogicService';
import { PrivateFileService } from 'croco-generic-app-logic';
import { ChatSymbolSpritePipe } from '../../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TicksToDatePipe,
    DatePipe,
    NgTemplateOutlet,
    AsyncPipe,
    ChatFileViewComponent,
    ChatSymbolSpritePipe
  ]
})
export class MessageComponent {
  @Input() public message?: MessageView;
  @Input() public isLastInGroupMessage?: boolean;
  @Input() public isFirstInGroupMessage?: boolean;
  @Input() public sender?: EccUserModel;
  @Input() public interlocutorVisitTime$?: Observable<number | undefined> | undefined;
  @Input() public isOutgoing?: boolean;
  @Input() public isLastMessage?: boolean;
  @Input() public isUploading?: boolean;
  public elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  constructor(private readonly service: PrivateFileService, public readonly _chatLogicService: ChatLogicService) { }

  public handleClickOnFile(file: ChatMessageAttachmentFileModel): void {
    if (!this.isUploading) {
      this.downloadFile(file);
    }
  }

  public downloadFile(file: ChatMessageAttachmentFileModel): void {
    const url = this.service.getDownloadUrl(file.fileId)
    const anchor = document.createElement('a');
    anchor.setAttribute('style', 'display: none;');
    document.body.appendChild(anchor);
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', file.fileName);
    anchor.click();
    anchor.remove();
  }
}
