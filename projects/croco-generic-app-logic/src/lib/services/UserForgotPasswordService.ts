import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse } from "../models";
import { ChangePasswordByToken, ForgotPasswordModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class UserForgotPasswordService {
    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
    }

    public userForgotPassword(data: ForgotPasswordModel): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this.baseUrl + 'Api/Account/UserForgotPassword', data);
    }

    public changePasswordByToken(data: ChangePasswordByToken): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this.baseUrl + 'Api/Account/UserForgotPassword/ChangePassword', data);
    }
}
