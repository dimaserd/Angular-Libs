import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { GenericBaseApiResponse, QuestionAnswerWithResult, SolutionWithAnswerModel, SolutionWithAnswersModel, StudentTestSolutionDataModel } from "../models";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentTestSolutionService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution/';
    }

    checkSolutionAnswer(model: SolutionWithAnswerModel) {
        return this._httpClient.post<GenericBaseApiResponse<QuestionAnswerWithResult>>(this.baseControllerUrl + `CheckSolutionAnswer`, model);
    }

    finishSolution(model: SolutionWithAnswersModel): Observable<GenericBaseApiResponse<StudentTestSolutionDataModel>> {
        return this._httpClient.post<GenericBaseApiResponse<StudentTestSolutionDataModel>>(this.baseControllerUrl + "Finish", model);
    }
}


