import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { GenericBaseApiResponse, QuestionAnswerWithResult, SolutionWithAnswerModel, SolutionWithAnswersModel, StudentTestSolutionDataModel, StudentTestSolutionModel } from "../models";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentTestSolutionService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/TestSolution/';
    }

    checkSolutionAnswerOld(model: SolutionWithAnswerModel) {
        return this._httpClient.post<GenericBaseApiResponse<StudentTestSolutionDataModel>>(this.baseControllerUrl + `CheckSolutionAnswer/Old`, model);
    }

    checkSolutionAnswer(model: SolutionWithAnswerModel) {
        return this._httpClient.post<GenericBaseApiResponse<QuestionAnswerWithResult>>(this.baseControllerUrl + `CheckSolutionAnswer`, model);
    }

    getSolutionById(solutionId: string): Observable<StudentTestSolutionModel> {
        return this._httpClient.get<StudentTestSolutionModel>(this.baseControllerUrl + `GetSolution?id=${solutionId}`);
    }

    finishSolution(model: SolutionWithAnswersModel): Observable<GenericBaseApiResponse<StudentTestSolutionDataModel>> {
        return this._httpClient.post<GenericBaseApiResponse<StudentTestSolutionDataModel>>(this.baseControllerUrl + "Finish", model);
    }
}


