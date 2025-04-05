import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthService {

  private screenWidth = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(event: Event) {
    this.screenWidth.next(window.innerWidth);
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidth.asObservable()
  }
}
