import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateTestForStudentErrorsRequest, StartSolutionFromDirectoryRequest, StartTestSolutionByTestIdRequest, TestSolutionCreatedResult } from "../models";

@Injectable({ providedIn: 'root' })
export class StudentTestSolutionStartService {
   private readonly baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution/start';
    }

    startByTestId(model: StartTestSolutionByTestIdRequest): Observable<TestSolutionCreatedResult> {
        return this._httpClient.post<TestSolutionCreatedResult>(`${this.baseControllerUrl}/By/TestId`, model);
    }

    startByDirectory(model: StartSolutionFromDirectoryRequest): Observable<TestSolutionCreatedResult> {
        return this._httpClient.post<TestSolutionCreatedResult>(`${this.baseControllerUrl}/By/Directory`, model);
    }

    startByErrors(model: CreateTestForStudentErrorsRequest): Observable<TestSolutionCreatedResult> {
        return this._httpClient.post<TestSolutionCreatedResult>(`${this.baseControllerUrl}/By/Errors`, model);
    }
}
