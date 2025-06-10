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
import {Subscription} from 'rxjs';
import {Notifier, NOTIFIER_DEFAULT_SETTING, NotifierSetting, NotifierType} from './chat-notifier.model';
import {ChatNotifierService} from './chat-notifier.service';
import {animate, AnimationBuilder, style} from '@angular/animations';
import { NgIf, NgFor, NgStyle } from '@angular/common';

const ANIMATION_TIME = 200;

@Component({
    selector: 'app-chat-notifier',
    templateUrl: 'chat-notifier.component.html',
    styleUrls: ['./chat-notifier.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        NgStyle,
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
    private animationBuilder: AnimationBuilder,
    private renderer: Renderer2,
    private changeDetection: ChangeDetectorRef,
  ) {}

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
          this.notifiers.push(notifier);
          const containerTop = this.notifiersList.nativeElement.getBoundingClientRect().top;
          this.renderer.setStyle(this.notifiersList.nativeElement, 'top', `${containerTop}px`);
          this.changeDetection.detectChanges();
          const notifications = this.notifiersList.nativeElement.children;
          const notificationHeight = (notifications[0] as HTMLElement).offsetHeight;
          // TODO: false проверка мобилка или нет
          const margin = this.notifiers.length === 1 ? 0 : 8;
          const animationPlayer = this.animationBuilder
            .build([
              style({ top: `${containerTop}px` }),
              animate(ANIMATION_TIME, style({ top: `${containerTop - notificationHeight - margin}px` })),
            ])
            .create(this.notifiersList.nativeElement);
          animationPlayer.onDone(() => {
            this.animationInProgress = false;
            this.animationQueue = this.animationQueue.filter((animationInQueue) => animationInQueue !== animation);
            animationPlayer.destroy();
            this.renderer.setStyle(this.notifiersList.nativeElement, 'top', null);
            handleDone();
            if (this.animationQueue.length) {
              this.animationQueue.shift()();
            }
          });
          animationPlayer.play();
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
      const notification = this.notifiersList.nativeElement.children[notificationPosition];
      const animationPlayer = this.animationBuilder
        .build([style({ opacity: 1 }), animate(ANIMATION_TIME, style({ opacity: 0 }))])
        .create(notification);
      animationPlayer.onDone(() => {
        animationPlayer.destroy();
        this.renderer.setStyle(notification, 'visibility', 'hidden');
        handleDone();
      });
      animationPlayer.play();
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
