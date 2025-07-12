import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, GetListResult, StudentGroupSimpleModel } from "../models";
import { SearchTestsRequest, CreateTestRequest, EditTestRequest } from "../models/test-models";

@Injectable({
    providedIn: 'root',
})
export class TestsService {
    baseControllerUrl:string;
    
    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string){
        const adding = 'api/tutor/tests';
        this.baseControllerUrl = baseUrl + adding;
    }

    public searchGroupRelationsInTest(model: SearchTestsRequest): Observable<GetListResult<StudentGroupSimpleModel>>{
        return this._httpClient.post<GetListResult<StudentGroupSimpleModel>>(`${this.baseControllerUrl}/groups/search/in`, model);
    }

    public create(model: CreateTestRequest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/create`, model);
    }

    public edit(model: EditTestRequest): Observable<BaseApiResponse> {
        return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/edit`, model);
    }
}