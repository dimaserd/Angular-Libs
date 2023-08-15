import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericBaseApiResponse, StartSolutionFromDirectory, StartTestSolutionByTestId, StudentTestSolutionModel } from "../models";

@Injectable({ providedIn: 'root' })
export class StudentTestSolutionStartService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution/Start/';
    }

    startByTestId(model: StartTestSolutionByTestId): Observable<GenericBaseApiResponse<StudentTestSolutionModel>> {
        return this._httpClient.post<GenericBaseApiResponse<StudentTestSolutionModel>>(this.baseControllerUrl + `By/TestId`, model);
    }

    startByDirectory(model: StartSolutionFromDirectory): Observable<GenericBaseApiResponse<StudentTestSolutionModel>> {
        return this._httpClient.post<GenericBaseApiResponse<StudentTestSolutionModel>>(this.baseControllerUrl + `By/Directory`, model);
    }
}
