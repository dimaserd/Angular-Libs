import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import {BehaviorSubject, defaultIfEmpty, filter, Observable, of, switchMap, take, timer} from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CurrentLoginData, LoginModel, LoginResultModel, LoginByEmailOrPhoneNumber, LoginViaLinkRequest, LoginViaLinkResult, LogoutResponse, LogoutErrorType } from '../models/login-models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginData$ = new BehaviorSubject<CurrentLoginData>(null);

  private loginDataCached$ = this.loginData$.pipe(
    switchMap(data => {
      // Если данные уже есть в loginData$, просто возвращает их
      if (data) return of(data);

      // Если данных нет, начинает проверять их наличие каждые 300 мс
      return timer(0, 300).pipe(
        // Ограничивает и делает максимум 5 повторений и потом завершает поток
        take(5),
        // Каждые 300 мс запрашивает текущее значение loginData$
        switchMap(() => this.loginData$),
        // Пропускает только непустые значения
        filter(val => !!val),
        // Берёт первое непустое значение и завершает стрим
        take(1),
        // Если ничего не получили, возвращает null
        defaultIfEmpty(null),
        // Если данные появились - возвращает их,
        // если нет - делаем запрос через getLoginData()
        switchMap(cached => cached ? of(cached) : this.getLoginData())
      );
    })
  );

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') private readonly _baseUrl: string
  ) {
  }

  clearLoginDataCache(){
    this.loginData$.next(null);
  }

  loginByEmail(data: LoginModel): Observable<LoginResultModel> {
    return this.loginByEmailApi(data).pipe(tap(res => {
      if(res.succeeded){
        this.clearLoginDataCache();
        this.getLoginData().subscribe();
      }
    }));
  }

  loginByEmailOrPhoneNumber(data: LoginByEmailOrPhoneNumber): Observable<LoginResultModel> {
    return this.loginByEmailOrPhoneNumberApi(data).pipe(tap(res => {
      if(res.succeeded){
        this.clearLoginDataCache();
        this.getLoginData().subscribe();
      }
    }));
  }

  loginByLink(model: LoginViaLinkRequest){
    return this._httpClient.post<LoginViaLinkResult>(`${this._baseUrl}api/account/Login/ByLink`, model);
  }

  private loginByEmailApi(data: LoginModel): Observable<LoginResultModel> {
    return this._httpClient
      .post<LoginResultModel>(`${this._baseUrl}api/Account/Login/ByEmail`, data)
  }

  private loginByEmailOrPhoneNumberApi(data: LoginByEmailOrPhoneNumber): Observable<LoginResultModel> {
    return this._httpClient
      .post<LoginResultModel>(`${this._baseUrl}api/Account/Login`, data)
  }

  logOut(): Observable<LogoutResponse> {
    return this._httpClient
      .post<LogoutResponse>(`${this._baseUrl}api/Account/LogOut`, {})
      .pipe(tap(res => {
        if(res.succeeded || (!res.succeeded && res.errorType === LogoutErrorType.NotAuthenticated)) {
          this.clearLoginDataCache();
          this.getLoginData().subscribe();
        }
      }));
  }

  public getLoginData(): Observable<CurrentLoginData> {
    return this.getLoginDataApi().pipe(tap(data => {
      this.loginData$.next(data);
    }));
  }

  getLoginDataCached(): Observable<CurrentLoginData> {
    return this.loginDataCached$;
  }

  private getLoginDataApi(): Observable<CurrentLoginData> {
    return this._httpClient
      .get<CurrentLoginData>(`${this._baseUrl}api/Account/User`);
  }
}
