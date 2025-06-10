import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {INotifier, Notifier, NotifierType} from './chat-notifier.model';

@Injectable({
  providedIn: 'root',
})
export class ChatNotifierService {
  private subject = new Subject<Notifier>();

  public onNotifier(notifierId?: string): Observable<Notifier> {
    return this.subject.asObservable().pipe(filter((x) => x && x.notifierId === notifierId));
  }

  public success(config: Partial<INotifier>): void {
    this.notifier(
      new Notifier({
        ...config,
        type: NotifierType.Success,
      }),
    );
  }

  public process(config: Partial<INotifier>): void {
    this.notifier(
      new Notifier({
        ...config,
        type: NotifierType.Process,
      }),
    );
  }

  public error(config: Partial<INotifier>): void {
    this.notifier(
      new Notifier({
        ...config,
        type: NotifierType.Error,
      }),
    );
  }

  public warning(config: Partial<INotifier>): void {
    this.notifier(
      new Notifier({
        ...config,
        type: NotifierType.Warning,
      }),
    );
  }

  public notifier(notifier: Notifier): void {
    this.subject.next(notifier);
  }

  public clear(notifierId?: string): void {
    this.subject.next(new Notifier({ notifierId }));
  }
}
