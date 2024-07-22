import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchStudentTestSolutions, GetListResult, TestSolutionCourseData, StudentTestSolutionWithChatInfo, StudentTestSolutionModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class TestSolutionQueryService {

    private readonly _baseUrl: string = "";

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
    ) {
        this._baseUrl = `${baseUrl}api/tutor/test-solution/query`;
    }

    public searchByStudent(model: SearchStudentTestSolutions): Observable<GetListResult<StudentTestSolutionWithChatInfo>> {
        return this._httpClient.post<GetListResult<StudentTestSolutionWithChatInfo>>(`${this._baseUrl}/Search/By/Student`, model);
    }

    public getCourseData(id: string): Observable<TestSolutionCourseData> {
        return this._httpClient.get<TestSolutionCourseData>(`${this._baseUrl}/Get/By/Id/${id}/course-data`);
    }

    public getSolutionById(id: string): Observable<StudentTestSolutionModel> {
        return this._httpClient.get<StudentTestSolutionModel>(`${this._baseUrl}/Get/By/Id/${id}`);
    }
}