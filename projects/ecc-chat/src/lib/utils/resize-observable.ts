import {Observable} from 'rxjs';

export function resizeObservable(elem: Element, options?: ResizeObserverOptions): Observable<ResizeObserverEntry[]> {
  return new Observable((subscriber) => {
    const resizeObserver = new ResizeObserver((entries) => {
      subscriber.next(entries);
    });
    resizeObserver.observe(elem, options);
    return function unsubscribe(): void {
      resizeObserver.unobserve(elem);
    };
  });
}
