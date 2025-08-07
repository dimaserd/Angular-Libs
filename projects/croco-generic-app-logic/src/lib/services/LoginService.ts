import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CurrentLoginData, LoginModel, LoginResultModel, LoginByEmailOrPhoneNumber, LoginViaLinkRequest, LoginViaLinkResult, LogoutResponse, LogoutErrorType } from '../models/login-models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginData$ = new BehaviorSubject<CurrentLoginData>(null);

  private hasRequestForLoginData = false;

  // Отрабатываю только изменения, а не null который является значением по-умолчанию.
  private loginDataCached$ = this.loginData$.pipe(filter(data => data !== null && data !== undefined));

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') private readonly _baseUrl: string
  ) {
  }

  clearLoginDataCache() {
    this.loginData$.next(null);
  }

  loginByEmail(data: LoginModel): Observable<LoginResultModel> {
    return this.loginByEmailApi(data).pipe(tap(res => {
      if (res.succeeded) {
        this.clearLoginDataCache();
        this.getLoginData().subscribe();
      }
    }));
  }

  loginByEmailOrPhoneNumber(data: LoginByEmailOrPhoneNumber): Observable<LoginResultModel> {
    return this.loginByEmailOrPhoneNumberApi(data).pipe(tap(res => {
      if (res.succeeded) {
        this.clearLoginDataCache();
        this.getLoginData().subscribe();
      }
    }));
  }

  loginByLink(model: LoginViaLinkRequest) {
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
        if (res.succeeded || (!res.succeeded && res.errorType === LogoutErrorType.NotAuthenticated)) {
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

    // Избавляемся от нескольких запросов
    if (!this.hasRequestForLoginData) {

      // Вызываем метод авторизации
      this.getLoginData().subscribe();
      this.hasRequestForLoginData = true;
    }

    return this.loginDataCached$;
  }

  private getLoginDataApi(): Observable<CurrentLoginData> {
    return this._httpClient
      .get<CurrentLoginData>(`${this._baseUrl}api/Account/User`);
  }
}
