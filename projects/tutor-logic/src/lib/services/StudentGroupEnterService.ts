import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetToGroupByCodeRequest, GetToGroupByCodeResponse } from "../models";

@Injectable({
    providedIn: 'root',
})
export class StudentGroupEnterService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student-group/enter/';
    }

    public enterViaCode(model: GetToGroupByCodeRequest): Observable<GetToGroupByCodeResponse> {
        return this._httpClient.post<GetToGroupByCodeResponse>(this.baseControllerUrl + 'ViaCode', model);
    }

    public enterFreeOfCharge(id: string): Observable<GetToGroupByCodeResponse> {
        return this._httpClient.post<GetToGroupByCodeResponse>(this.baseControllerUrl + `FreeOfCharge/${id}`, {});
    }
}
