import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListResult, SearchStudents, StudentSimpleModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class StudentQueryService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student/query/';
    }

    public getById(id: string): Observable<StudentSimpleModel> {
        return this._httpClient.get<StudentSimpleModel>(this.baseControllerUrl + `ById/${id}`);
    }

    public getByTelegramId(telegramId: number): Observable<StudentSimpleModel> {
        return this._httpClient.get<StudentSimpleModel>(this.baseControllerUrl + `ByTelegramId/${telegramId}`);
    }

    public search(searchModel: SearchStudents): Observable<GetListResult<StudentSimpleModel>> {
        return this._httpClient.post<GetListResult<StudentSimpleModel>>(this.baseControllerUrl + 'Search', searchModel);
    }
}