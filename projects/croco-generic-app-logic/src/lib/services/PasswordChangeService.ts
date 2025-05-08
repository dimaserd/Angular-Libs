import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, ChangePasswordByTokenRequest, ChangeUserPasswordModel } from "../models";
import { RestorePasswordRequest } from "../models";

/**
 * Сервис для изменения пароля
 */
@Injectable({
    providedIn: 'root',
})
export class PasswordChangeService {
    
    private readonly _baseControllerUrl: string = "";

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
            this._baseControllerUrl = `${baseUrl}api/account/password`;
    }

    /**
     * Запуск операции востановления пароля
     * @param data 
     * @returns 
     */
    public userForgotPassword(data: RestorePasswordRequest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this._baseControllerUrl + '/forgot/start', data);
    }

    /**
     * Востановление пароля по токену (токен обычно приходит в письме)
     * @param data 
     * @returns 
     */
    public changePasswordByToken(data: ChangePasswordByTokenRequest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this._baseControllerUrl + '/forgot/change', data);
    }

    /**
     * Изменить пароль
     * @param data 
     * @returns 
     */
    public change(data: ChangeUserPasswordModel){
        return this._httpClient.post<BaseApiResponse>(this._baseControllerUrl + '/change', data);
    }
}
