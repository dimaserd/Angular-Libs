import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, GetListResult } from "../models";
import { TestSearchModel, StudentGroupSimpleModel, CreateTest, EditTest } from "../models/test-models";

@Injectable({
    providedIn: 'root',
})
export class TestsService {
    baseControllerUrl:string;
    
    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string){
        const adding = 'api/tutor/tests/';
        this.baseControllerUrl = baseUrl + adding;
    }

    public searchGroupRelationsInTest(model: TestSearchModel): Observable<GetListResult<StudentGroupSimpleModel>>{
        return this._httpClient.post<GetListResult<StudentGroupSimpleModel>>(this.baseControllerUrl + 'groups/search/in', model);
    }

    public create(model: CreateTest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'Create', model);
    }

    public edit(model: EditTest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'Edit', model);
    }
}