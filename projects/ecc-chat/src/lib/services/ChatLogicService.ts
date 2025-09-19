import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ChatDetailedModel, ChatService, UserInChatModel } from './ChatService';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { ChatSettings } from '../models/chat-settings';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { MessageView } from '../models/message-view.interface';
import { ChatMessagingService } from './ChatMessagingService';
import { MessageComponent } from '../components/chat-main/chat-messages/message/message.component';
import {
  LoginService,
  PrivateFileUploadService,
} from 'croco-generic-app-logic';
import { MessagesDayGroupInterface } from '../models/messages-day-group.interface';
import { mapAndFilterMessagesBeforePush } from '../utils/map-and-filter-messages-before-push';
import { pushMessages } from '../utils/push-messages';
import { dateToTicks } from '../utils/base/date-to-ticks';
import { defaultChatSettings } from '../utils/default-chat-settings';

@Injectable({
  providedIn: 'root',
})
export class ChatLogicService {
  constructor(
    private readonly _chatService: ChatService,
    private readonly privateFileUploadService: PrivateFileUploadService,
    private readonly _chatMessagingService: ChatMessagingService,
    private readonly _loginService: LoginService
  ) {}

  public chatSettings: ChatSettings = defaultChatSettings;
  public chatUsers: Array<UserInChatModel> = [];
  public currentUserId = '';
  public notReadMessages: MessageView[] = [];

  public editableMessage$: BehaviorSubject<MessageView | undefined | null> =
    new BehaviorSubject(null);
  public chatChanges$: Observable<ChatDetailedModel>;
  public chatIdSubject$ = new BehaviorSubject<number | undefined>(undefined);
  public updateMessages$ = new BehaviorSubject<boolean>(null);
  public messagesByDays$ = new BehaviorSubject<MessagesDayGroupInterface[]>([]);

  private _updateMessagesSubscription: Subscription | null = null;
  private _loginDataSubscription: Subscription | null = null;

  initChatLogic(chatId: number) {
    this.editableMessage$.next(undefined);
    this.chatIdSubject$.next(chatId);
    this.chatChanges$ = this.getChatRootDataChanges(chatId);

    if (!this._loginDataSubscription) {
      // Не подписываемся если уже подписались
      this._loginDataSubscription = this._loginService
        .getLoginDataCached()
        .subscribe((data) => {
          this.currentUserId = data.userId;
        });
    }

    if (this._updateMessagesSubscription) {
      this._updateMessagesSubscription.unsubscribe();
    }

    this.updateMessages$.next(true);
    this._updateMessagesSubscription = this.updateMessages$
      .pipe(
        switchMap(() => {
          return this.getLastMessages();
        })
      )
      .subscribe((data) => {
        this.messagesByDays$.next(data.messages);
      });
  }

  closeChatLogic() {
    // Закрываем подписку для получения списка сообщений
    if (this._updateMessagesSubscription) {
      this._updateMessagesSubscription.unsubscribe();
    }
  }

  public editMessage(message: MessageView): void {
    this.editableMessage$.next(message);
  }

  public sendAfterEdit(messageText: string): void {
    if (messageText) {
      const id = this.editableMessage$.getValue().message.id;
      this.editableMessage$.next(null);

      this._chatMessagingService
        .edit({
          message: messageText,
          id,
        })
        .subscribe(() => {
          this.updateMessages$.next(true);
        });
    }
  }

  public sendMessageToServer(messageText: string, attachmentsSetId: string) {
    return this._chatMessagingService.send({
      message: messageText,
      chatId: this.chatIdSubject$.getValue(),
      tagString: '',
      attachmentsSetId: attachmentsSetId,
    });
  }

  public setUploadFilesWithTextRequest(
    messageText: string,
    files: File[],
    filesUploadingProgress: BehaviorSubject<
      { uploadingLoaded?: number; uploadingTotal?: number }[]
    >,
    uploadingMessage: MessageView
  ) {
    const dt = new DataTransfer();
    files.forEach((file) => {
      if (file instanceof File) {
        dt.items.add(file);
      }
    });
    const fileList = dt.files;

    return this.privateFileUploadService
      .uploadWithProgress(fileList, true, null)
      .pipe(
        tap((result) => {
          filesUploadingProgress.next([result]);
        }),
        filter((result) => !result.loading),
        take(1),
        map((result) => result.setId),
        switchMap((setId) => this.sendMessageToServer(messageText, setId)),
        takeUntil(uploadingMessage.cancel)
      );
  }

  private getChatRootDataChanges(
    chatId: number
  ): Observable<ChatDetailedModel> {
    return this._chatService.getById(chatId).pipe(
      tap((data) => {
        this.chatUsers = data.users;
      }),
      distinctUntilChanged(
        (a, b) =>
          a.id === b.id &&
          a.isSystem === b.isSystem &&
          a.isDialog === b.isDialog &&
          a.chatName === b.chatName &&
          b.users.length === a.users.length &&
          b.users.every((interlocutor) =>
            a.users.some(
              ({ lastVisitUtcTicks, user }) =>
                interlocutor.user.id === user.id &&
                interlocutor.user.email === user.email &&
                lastVisitUtcTicks === interlocutor.lastVisitUtcTicks
            )
          )
      )
    );
  }

  public setChatSettings(chatSettings: ChatSettings): void {
    this.chatSettings = chatSettings ?? defaultChatSettings;
  }

  public getLastMessages(): Observable<{
    messages: MessagesDayGroupInterface[];
    newIncomingMessages?: MessageView[];
  }> {
    let messages: MessagesDayGroupInterface[] = [];

    return timer(0, this.chatSettings.lastMessagesUpdateInterval).pipe(
      switchMap(() => {
        const lessThantUtcTicks = dateToTicks(new Date());
        return this._chatMessagingService.list({
          chatId: this.chatIdSubject$.getValue(),
          count: this.chatSettings.listResponseCount,
          lessThantUtcTicks: lessThantUtcTicks,
          setUserChatVisit: true,
        });
      }),
      map((lastMessages) => {
        const messagesToAdd = mapAndFilterMessagesBeforePush(
          lastMessages.list,
          messages
        );
        messages = pushMessages(
          messagesToAdd,
          messages,
          this.chatUsers.map((item) => item.user),
          messages[0]?.messagesGroups[0]?.messages[0]?.message.sentOnUtcTicks >
            messagesToAdd[0]?.message.sentOnUtcTicks,
          this.currentUserId
        );

        const newIncomingMessages = messagesToAdd.filter(
          ({ message }) => message.senderUserId !== this.currentUserId
        );

        if (newIncomingMessages?.length) {
          this.notReadMessages = [
            ...this.notReadMessages,
            ...newIncomingMessages,
          ];
        }

        return { messages, newIncomingMessages };
      }),
      distinctUntilChanged((a, b) => a.messages === b.messages)
    );
  }

  public getMessagesAfterScroll(
    messages: MessagesDayGroupInterface[]
  ): Observable<{
    messages: MessagesDayGroupInterface[];
    newIncomingMessages?: MessageView[];
  }> {
    return this._chatMessagingService
      .list({
        chatId: this.chatIdSubject$.getValue(),
        count: 30,
        lessThantUtcTicks:
          messages[0]?.messagesGroups[0].messages[0].message.sentOnUtcTicks,
        setUserChatVisit: false,
      })
      .pipe(
        map((newMessages) => {
          return mapAndFilterMessagesBeforePush(newMessages.list, messages);
        }),
        map((newMessages) => {
          messages = pushMessages(
            newMessages,
            messages,
            this.chatUsers.map((item) => item.user),
            true,
            this.currentUserId
          );
          return messages;
        }),
        distinctUntilChanged(),
        map((messages) => ({ messages }))
      );
  }

  public getFirstAndLastVisibleMessages(
    targetElement: ElementRef,
    messagesElements: QueryList<MessageComponent>
  ): boolean {
    const lastVisibleMessage = Array.from(messagesElements ?? [])
      .reverse()
      ?.find(
        (element) =>
          element.elementRef.nativeElement.getBoundingClientRect().top <=
          targetElement.nativeElement.getBoundingClientRect().bottom
      );

    if (lastVisibleMessage) {
      const lastVisibleMessageTime =
        lastVisibleMessage.message?.message.sentOnUtcTicks;
      this.notReadMessages = this.notReadMessages.filter(
        ({ message }) => lastVisibleMessageTime < message.sentOnUtcTicks
      );
    }
    return !lastVisibleMessage || lastVisibleMessage.isLastMessage;
  }
}
