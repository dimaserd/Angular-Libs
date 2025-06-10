import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { ChatMainComponent } from '../chat-main/chat-main.component';
import { resizeObservable } from '../../utils/resize-observable';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatsListComponent } from '../chats-list/chats-list.component';

@Component({
  selector: 'app-chat-messenger',
  templateUrl: './chat-messenger.component.html',
  styleUrls: ['./chat-messenger.component.scss'],
  standalone: true,
  imports: [ChatsListComponent, ChatMainComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessengerComponent implements AfterViewInit {
  public activeChatId?: number;
  public isMobileView = false;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  public get hasChatId(): boolean {
    return typeof this.activeChatId === 'number';
  }

  public openChat(chatId: number | undefined): void {
    this.activeChatId = chatId;
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    resizeObservable(this.elementRef.nativeElement)
      .pipe(
        map(() => this.elementRef.nativeElement.offsetWidth < 800),
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((isMobileView) => {
        this.isMobileView = isMobileView;
        this.cdr.detectChanges();
      });
  }
}
