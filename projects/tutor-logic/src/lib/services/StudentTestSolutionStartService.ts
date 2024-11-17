import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StartSolutionFromDirectory, StartTestSolutionByTestId, TestSolutionCreatedResult } from "../models";

@Injectable({ providedIn: 'root' })
export class StudentTestSolutionStartService {
    baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution/start';
    }

    startByTestId(model: StartTestSolutionByTestId): Observable<TestSolutionCreatedResult> {
        return this._httpClient.post<TestSolutionCreatedResult>(`${this.baseControllerUrl}/v1/By/TestId`, model);
    }

    startByDirectory(model: StartSolutionFromDirectory): Observable<TestSolutionCreatedResult> {
        return this._httpClient.post<TestSolutionCreatedResult>(`${this.baseControllerUrl}/v1/By/Directory`, model);
    }
}
