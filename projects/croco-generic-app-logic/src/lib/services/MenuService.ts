import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppMenu } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseControllerUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/menu/';
  }

  public getMenu(name: string): Observable<AppMenu> {
    return this.http.get<AppMenu>(this.baseControllerUrl + name);
  }

  public getCachedMenu(name: string): Observable<AppMenu> {
    return this.http.get<AppMenu>(this.baseControllerUrl + `cache/get-by-name?name=${name}`);
  }
}
