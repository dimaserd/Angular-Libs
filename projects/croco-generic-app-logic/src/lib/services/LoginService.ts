import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';
import { CurrentLoginData, LoginModel, LoginResultModel, LoginByEmailOrPhoneNumber, LoginViaLinkRequest, LoginViaLinkResult } from '../models/login-models';
import { BaseApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginData$ = new BehaviorSubject<CurrentLoginData>(null);
  private loginDataCached$ = this.loginData$.pipe(concatMap(data => {  
    return data ? of(data) : this.getLoginData();
  }))

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
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
    return this._httpClient.post<LoginViaLinkResult>(this.baseUrl + "api/account/Login/ByLink", model);
  }

  private loginByEmailApi(data: LoginModel): Observable<LoginResultModel> {
    return this._httpClient
      .post<LoginResultModel>(this.baseUrl + 'api/Account/Login/ByEmail', data)
  }

  private loginByEmailOrPhoneNumberApi(data: LoginByEmailOrPhoneNumber): Observable<LoginResultModel> {
    return this._httpClient
      .post<LoginResultModel>(this.baseUrl + 'api/Account/Login', data)
  }

  logOut(): Observable<BaseApiResponse> {
    return this._httpClient
      .post<BaseApiResponse>(this.baseUrl + 'api/Account/LogOut', {})
      .pipe(tap(res => {
        if(res.isSucceeded){
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
      .get<CurrentLoginData>(this.baseUrl + 'api/Account/User');
  }
}
