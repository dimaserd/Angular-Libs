import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { GetToGroupByCodeRequest, EnterGroupResponse } from "../models";

@Injectable({
    providedIn: 'root',
})
export class StudentGroupEnterService {
    private readonly _baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = baseUrl + 'api/tutor/student-group/enter';
    }

    public enterViaCode(model: GetToGroupByCodeRequest) {
        return this._httpClient.post<EnterGroupResponse>(`${this._baseControllerUrl}/ViaCode`, model);
    }

    public enterFreeOfCharge(id: string) {
        return this._httpClient.post<EnterGroupResponse>(`${this._baseControllerUrl}/FreeOfCharge/${id}`, {});
    }
}
