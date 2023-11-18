import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BaseApiResponse, GenericBaseApiResponse, QuestionAnswerWithResult, QuestionInSolutionIdModel, SaveQuestionPointsValidation, TestQuestionWithModifiers, TestSolutionWithPointsValidation } from "../models";

/**
Методы контроллера Tutor.Api.Controllers.TestSolutions.TestSolutionResultController
BasePath = api/tutor/test-solution-result
*/
@Injectable({
    providedIn: 'root',
})
export class TestSolutionResultService {
    baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution-result/';
    }

    public getQuestionsWithModifiersBySolution(solutionId: string) {
        return this._httpClient.get<TestQuestionWithModifiers[]>(this.baseControllerUrl + `modifiers/${solutionId}`);
    }

    public getQuestionsWithPointsValidationBySolution(solutionId: string) {
        return this._httpClient.get<TestSolutionWithPointsValidation>(this.baseControllerUrl + `points/${solutionId}`);
    }

    public create(solutionId: string) {
        return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + `create/${solutionId}`, {});
    }

    public recalculate(solutionId: string) {
        return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + `recalculate/${solutionId}`, {});
    }

    public saveQuestionResult(model: SaveQuestionPointsValidation) {
        return this._httpClient.post<GenericBaseApiResponse<QuestionAnswerWithResult>>(this.baseControllerUrl + `question/validation/save`, model);
    }

    public removeQuestionResult(model: QuestionInSolutionIdModel) {
        return this._httpClient.post<GenericBaseApiResponse<QuestionAnswerWithResult>>(this.baseControllerUrl + `question/validation/remove`, model);
    }
}
