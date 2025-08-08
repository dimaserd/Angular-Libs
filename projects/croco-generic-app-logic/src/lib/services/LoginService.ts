import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { BehaviorSubject, filter, Observable, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CurrentLoginData, LoginModel, LoginResultModel, LoginByEmailOrPhoneNumber, LoginViaLinkRequest, LoginViaLinkResult, LogoutResponse, LogoutErrorType } from '../models/login-models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginData$ = new BehaviorSubject<CurrentLoginData>(null);

  private latestLoginDataRequest$ = new BehaviorSubject<string>(null);

  // Отрабатываю только изменения, а не null который является значением по-умолчанию.
  private loginDataCached$ = this.loginData$.pipe(filter(data => data !== null && data !== undefined));

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') private readonly _baseUrl: string
  ) {
  }

  clearLoginDataCacheAndGetLoginData() {
    this.loginData$.next(null);
    const subscription = this.getLoginData().subscribe();

    subscription.unsubscribe();
  }

  loginByEmail(data: LoginModel): Observable<LoginResultModel> {
    return this.loginByEmailApi(data).pipe(tap(res => {
      this.handleLoginResult(res);
    }));
  }

  loginByEmailOrPhoneNumber(data: LoginByEmailOrPhoneNumber): Observable<LoginResultModel> {
    return this.loginByEmailOrPhoneNumberApi(data).pipe(tap(res => {
      this.handleLoginResult(res);
    }));
  }

  handleLoginResult(result: LoginResultModel) {
    if (result.succeeded) {
      this.clearLoginDataCacheAndGetLoginData();
    }
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
          this.clearLoginDataCacheAndGetLoginData();
        }
      }));
  }

  public getLoginData(): Observable<CurrentLoginData> {
    return this.getLoginDataApi().pipe(tap(data => {
      this.loginData$.next(data);
    }));
  }

  getLoginDataCached(): Observable<CurrentLoginData> {

    const requestId = this.getUniqueRequestId();

    this.latestLoginDataRequest$.next(requestId);
    // Избавляемся от нескольких запросов к api
    timer(50).subscribe(() => {
      this.executeLatestLoginDataRequest(requestId);
    });

    return this.loginDataCached$;
  }

  getUniqueRequestId(): string {
    return new Date().getTime().toString() + Math.random().toString(16).slice(2)
  }

  private executeLatestLoginDataRequest(requestId: string) {
    
    if (this.latestLoginDataRequest$.value !== requestId) {
      return;
    }

    const subscription = this.getLoginData().subscribe();
    subscription.unsubscribe();
  }

  private getLoginDataApi(): Observable<CurrentLoginData> {
    return this._httpClient
      .get<CurrentLoginData>(`${this._baseUrl}api/Account/User`);
  }
}
