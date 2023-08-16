import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListResult, StudentGroupSimpleModel } from "../models";
import { SearchStudentGroups, StudentGroupDetailedModel, SearchStudentsInGroup, StudentInGroupSimpleModel, SearchStudentGroupsByStudentRequest, StudentGroupWithCourseProgressModel } from "../models/group-models";

@Injectable({
    providedIn: 'root',
})
export class StudentGroupQueryService {

    getBaseUrl() {
        return this._baseUrl + 'api/tutor/student-group/';
    }

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string) {
    }

    public search(model: SearchStudentGroups): Observable<GetListResult<StudentGroupSimpleModel>> {
        return this._httpClient.post<GetListResult<StudentGroupSimpleModel>>(this.getBaseUrl() + 'query/search', model);
    }

    public searchWithProgresses(model: SearchStudentGroupsByStudentRequest): Observable<GetListResult<StudentGroupWithCourseProgressModel>> {
        return this._httpClient.post<GetListResult<StudentGroupWithCourseProgressModel>>(this.getBaseUrl() + 'query/search/with-progresses', model);
    }

    public getById(id: string): Observable<StudentGroupDetailedModel> {
        return this._httpClient.get<StudentGroupDetailedModel>(this.getBaseUrl() + `query/by-id/${id}`);
    }

    public getByStudentId(id: string): Observable<StudentGroupSimpleModel[]> {
        return this._httpClient.get<StudentGroupSimpleModel[]>(this.getBaseUrl() + `by-student/${id}`);
    }

    public getStudentsList(model: SearchStudentsInGroup): Observable<GetListResult<StudentInGroupSimpleModel>> {
        return this._httpClient.post<GetListResult<StudentInGroupSimpleModel>>(this.getBaseUrl() + 'students/search', model);
    }
}

