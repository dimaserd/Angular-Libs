import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterAndSignInResult, RegisterModel, RegistrationResult } from "../models";

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
    }

    public register(data: RegisterModel): Observable<RegistrationResult> {
        return this._httpClient.post<RegistrationResult>(this.baseUrl + 'api/Account/Register', data);
    }

    public registerAndSignIn(data: RegisterModel): Observable<RegisterAndSignInResult> {
        return this._httpClient.post<RegisterAndSignInResult>(this.baseUrl + 'api/Account/RegisterAndSignIn', data);
    }
}
