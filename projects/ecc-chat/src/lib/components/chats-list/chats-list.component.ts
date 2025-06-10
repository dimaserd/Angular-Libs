import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChatsListItemComponent } from './components/chats-list-item/chats-list-item.component';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChatSymbolSpritePipe } from '../../pipes/chat-symbol-sprite.pipe';
import { IChatsListItem } from '../../models/chats-list-item.interface';
import { delay, Observable, repeatWhen, startWith, Subject } from 'rxjs';
import { ChatService, ChatSimpleModelWithUsers } from '../../services/ChatService';
import { Dialog } from '@angular/cdk/dialog';
import { InterlocutorService } from '../../services/interlocutor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, take } from 'rxjs/operators';
import { GetListResult } from 'tutor-logic';
import { CreateChatModalComponent } from './components/create-chat-modal/create-chat-modal.component';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChatsListItemComponent,
    ChatSearchComponent,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgScrollbarModule,
    ChatSymbolSpritePipe
  ]
})
export class ChatsListComponent implements OnInit {
  @Input() public chats: IChatsListItem[];
  @Input() public updateChatsListInterval = 5000;
  @Input() public activeChatId?: number;
  @Output() public onOpenChat = new EventEmitter<number | undefined>();

  public searchControl = new FormControl<string>('', { nonNullable: true });
  public loading = false;
  public skeletonCountArray = Array.from(Array(10));
  private updateChatListForce = new Subject<void>();

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private dialog: Dialog,
    private interlocutorService: InterlocutorService,
  ) { }

  public ngOnInit(): void {
    this.runChatListUpdate();
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {

      });
  }

  public runChatListUpdate(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.updateChatListForce
      .pipe(
        startWith(null),
        switchMap(
          (): Observable<GetListResult<ChatSimpleModelWithUsers>> =>
            this.chatService
              .searchWithUsers({
                offSet: 0,
                count: 100,
                filter: {
                  isDialog: null,
                  isSystem: null,
                  showChatsFromGroup: null,
                  type: '',
                },
              })
              .pipe(repeatWhen((completed$) => completed$.pipe(delay(this.updateChatsListInterval)))),
        ),
        takeUntilDestroyed(this._destroyRef),
      )

      .subscribe({
        next: (response) => {
          this.chats = response.list.map<IChatsListItem>(({ chat, users }) => {
            return {
              iconPath$: this.interlocutorService.getInterlocutorAvatar(users),
              id: chat.id,
              lastMessage: chat.lastMessage,
              // TODO: замьюченные чаты
              muted: false,
              chatName$: this.interlocutorService.getChatName(users, chat.chatName),
              unreadMessagesCount: chat.countOfUnreadMessages,
            };
          });
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  public createNewChat(): void {
    this.dialog
      .open<number | undefined>(CreateChatModalComponent)
      .closed.pipe(
        take(1),
        filter((chatId) => typeof chatId === 'number'),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((chatId) => {
        this.openChat(chatId);
        this.updateChatListForce.next();
      });
  }

  public openChat(chatId: number | undefined): void {
    this.activeChatId = chatId;
    this.onOpenChat.emit(this.activeChatId);
  }
}
