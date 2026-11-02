/* eslint-disable functional/immutable-data */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Notifier, NOTIFIER_DEFAULT_SETTING, NotifierSetting, NotifierType } from './chat-notifier.model';
import { ChatNotifierService } from './chat-notifier.service';
import { NgStyle } from '@angular/common';

const ANIMATION_TIME = 200;

@Component({
  selector: 'ecc-chat-notifier',
  templateUrl: 'chat-notifier.component.html',
  styleUrls: ['./chat-notifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgStyle
],
})
export class ChatNotifierComponent implements OnInit, OnDestroy {
  @Input() public id: string;
  @ViewChild('notifiersList', { static: false }) public notifiersList: ElementRef<HTMLElement>;

  public notifiers: Notifier[] = [];
  public NotifierType = NotifierType;
  public animationQueue: Array<() => void> = [];
  public animationInProgress = false;
  private subscription: Subscription;

  constructor(
    @Inject('notifierSetting') public setting: NotifierSetting,
    private notifierService: ChatNotifierService,
    private renderer: Renderer2,
    private changeDetection: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.setting = { ...NOTIFIER_DEFAULT_SETTING, ...this.setting };

    this.subscription = this.notifierService.onNotifier(this.id).subscribe((notifier) => {
      if (!notifier.message) {
        this.notifiers = [];
        return;
      }

      const handleDone = (): void => {
        const maxCount = this.setting.singleNotifier ? 1 : this.setting.maxNotificationsCount;
        if (this.notifiers.length > maxCount) {
          this.removeNotifier(this.notifiers[0], false);
        }
        this.changeDetection.detectChanges();
      };

      if (this.setting.animated) {
        const animation = (): void => {
          this.animationInProgress = true;
          this.changeDetection.detectChanges();
          const list = this.notifiersList.nativeElement;
          const heightBefore = list.offsetHeight;
          this.notifiers.push(notifier);
          this.changeDetection.detectChanges();
          this.playEnterTransition(list.offsetHeight - heightBefore, () => {
            this.animationInProgress = false;
            this.animationQueue = this.animationQueue.filter((animationInQueue) => animationInQueue !== animation);
            handleDone();
            if (this.animationQueue.length) {
              this.animationQueue.shift()();
            }
          });
        };
        this.animationQueue.push(animation);
        if (!this.animationInProgress) {
          animation();
        }
      } else {
        this.notifiers.unshift(notifier);
        handleDone();
      }

      if (this.setting.removeDelay !== null && this.setting.removeDelay !== undefined) {
        const animateBgDelay = notifier.animateBgDelay ? notifier.animateBgDelay * 1000 : 0;
        setTimeout(
          () => {
            this.removeNotifier(notifier, false);
          },
          animateBgDelay || this.setting.removeDelay + (this.setting.animated ? ANIMATION_TIME : 0),
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Сдвигает список вниз на высоту добавленного уведомления и плавно возвращает его на место.
   * Так новые уведомления «выезжают» снизу, а существующие сдвигаются вверх.
   */
  private playEnterTransition(offset: number, onDone: () => void): void {
    const list = this.notifiersList.nativeElement;
    this.renderer.addClass(list, 'notifier-enter');
    this.renderer.setStyle(list, 'transform', `translateY(${offset}px)`);
    // принудительно применяем стартовое положение до включения перехода
    void list.offsetHeight;
    this.renderer.removeClass(list, 'notifier-enter');
    this.renderer.removeStyle(list, 'transform');
    setTimeout(onDone, ANIMATION_TIME);
  }

  private playLeaveTransition(notification: HTMLElement, onDone: () => void): void {
    this.renderer.addClass(notification, 'notifier-leave');
    setTimeout(() => {
      this.renderer.setStyle(notification, 'visibility', 'hidden');
      onDone();
    }, ANIMATION_TIME);
  }

  public removeNotifier(notifierToRemove: Notifier, immediate = true): void {
    const index = this.notifiers.findIndex((notifier) => notifier === notifierToRemove);
    if (index === -1) {
      return;
    }

    const handleDone = (): void => {
      this.notifiers = this.notifiers.filter((notifier) => notifier !== notifierToRemove);
      this.changeDetection.detectChanges();
    };

    if (!this.setting.animated || immediate) {
      handleDone();
    } else {
      const closeAllShown = this.setting.showCloseAllCount && this.notifiers.length >= this.setting.showCloseAllCount;
      const notificationPosition = closeAllShown ? index + 1 : index;
      const notification = this.notifiersList.nativeElement.children[notificationPosition] as HTMLElement;
      this.playLeaveTransition(notification, handleDone);
    }
  }

  public removeAll(): void {
    this.notifiers = [];
    this.changeDetection.detectChanges();
  }

  public cancelNotifier(notifier: Notifier): void {
    notifier.onCancel();
    this.removeNotifier(notifier);
  }

  public actionNotifier(notifier: Notifier): void {
    notifier.onAction();
    this.removeNotifier(notifier);
  }

  public closeNotifier(notifier: Notifier): void {
    if (typeof notifier.onClose === 'function') {
      notifier.onClose();
    }
    this.removeNotifier(notifier);
  }
}
