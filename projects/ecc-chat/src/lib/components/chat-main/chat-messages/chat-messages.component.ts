import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  HostListener,
} from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { BehaviorSubject, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, filter, switchMap, take } from 'rxjs/operators';
import { EccUserModel } from '../../../services/ChatService';
import { MessagesDayGroupInterface } from '../../../models/messages-day-group.interface';
import { MessageComponent } from './message/message.component';
import { MessageView } from '../../../models/message-view.interface';
import { resizeObservable } from '../../../utils/resize-observable';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { PipeMapperPipe } from '../../../pipes/pipe-mapper.pipe';
import { ChatLogicService } from '../../../services/ChatLogicService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatConfirmDeleteModalComponent } from './chat-confirm-delete-modal/chat-confirm-delete-modal.component';
import { ChatMessagingService } from '../../../services/ChatMessagingService';
import { Dialog } from '@angular/cdk/dialog';
import { InputMessage } from '../../../models/input-message.interface';
import { format } from 'date-fns';
import { isFile } from '../../../utils/is-file';
import { getNextId } from '../../../utils/base/get-next-id';
import { dateToTicks } from '../../../utils/base/date-to-ticks';
import { ChatSymbolSpritePipe } from '../../../pipes/chat-symbol-sprite.pipe';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ecc-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgScrollbarModule,
    NgIf,
    MessageComponent,
    MatMenuModule,
    CdkMenuModule,
    AsyncPipe,
    PipeMapperPipe,
    ChatSymbolSpritePipe,
    MatIconModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar, { read: NgScrollbar })
  public scrollbarRef?: NgScrollbar;
  @ViewChildren('messageRef', { read: MessageComponent })
  public messagesElements?: QueryList<MessageComponent>;

  @Input()
  set newMessage(value: InputMessage) {
    if (value) {
      this.sendNewMessage(value);
      setTimeout(() => {
        this.scrollbarRef?.scrollTo({ bottom: 0 });
      });
    }
  }

  public uploadingMessages$ = new BehaviorSubject<MessageView[]>([]);
  public interlocutorVisitTime$: Observable<number | undefined> | undefined;
  public messagesByDays: MessagesDayGroupInterface[] = [];
  public chatIdInitialised = false;
  public scrollPositionBottom = true;
  public scrolled = new Subject<void>();

  public takeUntilDestroyed: OperatorFunction<unknown, unknown>;
  private longPressTimer: any = null;
  private longPressDelay = 500;

  constructor(
    private dialog: Dialog,
    private element: ElementRef,
    private cdr: ChangeDetectorRef,
    private readonly clipboard: Clipboard,
    public readonly _chatLogicService: ChatLogicService,
    private readonly _chatMessagingService: ChatMessagingService
  ) {
    this.takeUntilDestroyed = takeUntilDestroyed();
    resizeObservable(this.element.nativeElement)
      .pipe(this.takeUntilDestroyed)
      .subscribe(() => {
        if (this.scrollPositionBottom) {
          this.scrollbarRef?.scrollTo({ bottom: 0, duration: 0 });
        }
      });
  }

  public getTextForAvatar(user: EccUserModel | undefined): string | undefined {
    return user?.email?.[0]?.toUpperCase();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    const messageElement = (event.target as HTMLElement).closest('app-message');
    if (messageElement) {
      this.longPressTimer = setTimeout(() => {
        this.showContextMenu(event, messageElement);
      }, this.longPressDelay);
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private showContextMenu(event: TouchEvent, messageElement: any): void {
    const messageComponent = this.messagesElements?.find(
      (comp) => comp.elementRef.nativeElement === messageElement
    );

    if (messageComponent?.message) {
      const contextMenuEvent = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
        button: 2,
      });
      messageElement.dispatchEvent(contextMenuEvent);
    }
  }

  ngAfterViewInit(): void {
    this.scrolled
      .pipe(
        this.takeUntilDestroyed,
        debounceTime(100),
        switchMap((data) => {
          return this._chatLogicService.getMessagesAfterScroll(
            this.messagesByDays
          );
        })
      )
      .subscribe((data) => {
        this.messagesByDays = data.messages;
        this.scrollPositionBottom =
          this._chatLogicService.getFirstAndLastVisibleMessages(
            this.element,
            this.messagesElements
          );
        this.cdr.detectChanges();
      });
  }

  ngOnInit(): void {
    this.chatIdInitialised = true;

    this._chatLogicService.messagesByDays$.subscribe((messages) => {
      if (!messages) {
        return;
      }

      this.messagesByDays = messages;

      let uploadingMessages = this.uploadingMessages$.value;
      uploadingMessages = uploadingMessages.filter(
        (message) => !message.onServerId
      );
      this.uploadingMessages$.next(uploadingMessages);

      setTimeout(() => {
        this.scrollbarRef?.scrollTo({ bottom: 0, duration: 0 }).then();
        this.cdr.detectChanges();
      }, 10);

      this.cdr.detectChanges();
    });
  }
  public editMessage(message: MessageView): void {
    this._chatLogicService.editMessage(message);
  }

  public copyToClipboard(message: MessageView): void {
    this.clipboard.copy(message?.message?.message);
  }

  public deleteMessage(message: MessageView): void {
    this.dialog
      .open(ChatConfirmDeleteModalComponent, { data: message })
      .closed.pipe(
        take(1),
        filter((confirm) => Boolean(confirm)),
        switchMap(() => this._chatMessagingService.delete(message.message.id))
      )
      .subscribe(() => {
        // Удаляем сообщение в messagesByDays
        for (let day of this.messagesByDays) {
          // Проходим по всем группам сообщений в дне
          for (let group of day.messagesGroups) {
            // Ищем индекс сообщения с нужным ID
            const messageIndex = group.messages.findIndex(
              (msg) => msg.message.id === message.message.id
            );

            // Если нашли сообщение - удаляем его
            if (messageIndex !== -1) {
              group.messages.splice(messageIndex, 1);

              // Если группа сообщений стала пустой, можно удалить и её
              if (group.messages.length === 0) {
                const groupIndex = day.messagesGroups.indexOf(group);
                day.messagesGroups.splice(groupIndex, 1);
              }

              // Если день стал пустым, можно удалить и день
              if (day.messagesGroups.length === 0) {
                const dayIndex = this.messagesByDays.indexOf(day);
                this.messagesByDays.splice(dayIndex, 1);
              }
            }
          }
        }
        this.cdr.markForCheck();
      });
  }

  public scrollToFirstNotReadOrBottom(): void {
    this.scrollPositionBottom = true;
    if (this._chatLogicService.notReadMessages.length) {
      const firstNotReadMessageElement = this.messagesElements?.find(
        (element) =>
          element.message?.message.id ===
          this._chatLogicService.notReadMessages[0].message.id
      );
      if (firstNotReadMessageElement) {
        this.scrollbarRef?.scrollToElement(
          firstNotReadMessageElement.elementRef.nativeElement
        );
        return;
      }
    }
    this.scrollbarRef?.scrollTo({ bottom: 0 });
  }

  public get today(): Date {
    return new Date();
  }

  public hasSentMessagesToday(): boolean {
    const today = new Date();
    const lastDay = this.messagesByDays?.[this.messagesByDays.length - 1]?.date;
    return (
      lastDay &&
      today.getFullYear() === lastDay.getFullYear() &&
      lastDay.getMonth() === today.getMonth() &&
      today.getDate() === lastDay.getDate()
    );
  }

  private sendNewMessage(message: InputMessage): void {
    const attachments = message.files?.map((file) =>
      isFile(file)
        ? { fileId: `${getNextId()}`, fileName: file.name, size: file.size }
        : file
    );
    const date = new Date();
    const sentOnUtcTicks = dateToTicks(date);
    const filesUploadingProgress = new BehaviorSubject<
      { uploadingLoaded?: number; uploadingTotal?: number }[]
    >([]);
    const uploadingMessageId = `${getNextId()}`;
    const uploadingMessage: MessageView = {
      dayId: format(date, 'yyyy.MM.dd'),
      date,
      isUploading: true,
      filesUploadingProgress$: filesUploadingProgress.asObservable(),
      onServerId: new BehaviorSubject(null),
      sendingFailed: new BehaviorSubject(false),
      cancel: new Subject(),
      message: {
        id: uploadingMessageId,
        message: message.text,
        sentOnUtcTicks: sentOnUtcTicks,
        lastUpdateUtcTicks: sentOnUtcTicks,
        senderUserId: '',
        tagString: '',
        attachments,
      },
    };

    const uploadingMessages = this.uploadingMessages$.value;
    this.uploadingMessages$.next([...uploadingMessages, uploadingMessage]);

    const filesToSend = message.files
      ?.map((x) => (x instanceof File ? x : null))
      .filter((x) => x !== null);

    const request = !message.files
      ? this._chatLogicService.sendMessageToServer(message.text, null)
      : this._chatLogicService.setUploadFilesWithTextRequest(
          message.text,
          filesToSend,
          filesUploadingProgress,
          uploadingMessage
        );

    request.subscribe({
      next: (response) => {
        uploadingMessage.onServerId.next(response.responseObject.id);
      },
      error: () => {
        uploadingMessage.sendingFailed.next(true);
      },
    });
  }
}
