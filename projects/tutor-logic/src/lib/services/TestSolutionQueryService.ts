import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OpenApiExtensions, OpenApiUrlProvider } from "../extensions";
import { Observable } from "rxjs";
import { SearchStudentTestSolutions, GetListResult, TestSolutionCourseData, StudentTestSolutionWithChatInfo, StudentTestSolutionModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class TestSolutionQueryService {

    getBaseUrl() {
        return OpenApiExtensions.buildOpenApiUrl(this._urlProvider, 'api/tutor/test-solution/query/');
    }

    constructor(private _httpClient: HttpClient,
        private _urlProvider: OpenApiUrlProvider) {
    }

    public searchByStudent(model: SearchStudentTestSolutions): Observable<GetListResult<StudentTestSolutionWithChatInfo>> {
        return this._httpClient.post<GetListResult<StudentTestSolutionWithChatInfo>>(this.getBaseUrl() + "Search/By/Student", model);
    }

    public getCourseData(id: string): Observable<TestSolutionCourseData> {
        return this._httpClient.get<TestSolutionCourseData>(this.getBaseUrl() + `Get/By/Id/${id}/course-data`);
    }

    public getSolutionById(id: string): Observable<StudentTestSolutionModel> {
        return this._httpClient.get<StudentTestSolutionModel>(this.getBaseUrl() + `Get/By/Id/${id}`);
    }
}