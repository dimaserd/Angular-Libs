import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { GenericBaseApiResponse, GetListResult, SearchMyTestSolutionsRequest, StudentTestSolutionDataModel, StudentTestSolutionWithChatInfo, TestWithActiveSolutionModel } from "../models";

/**
Методы контроллера Tutor.Api.Controllers.TestSolutions.StudentTestSolutionQueryController
BasePath = api/tutor/test-solution/query/mine
*/
@Injectable({ providedIn: 'root' })
export class StudentTestSolutionQueryService {
    private readonly baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/test-solution/query/mine';
    }

    search(model: SearchMyTestSolutionsRequest) {
        return this._httpClient.post<GetListResult<StudentTestSolutionWithChatInfo>>(`${this.baseControllerUrl}/search`, model);
    }

    getResultById(id: string){
        let url = `${this.baseControllerUrl}/Get/By/Id/${id}/result`;

        return this._httpClient.get<GenericBaseApiResponse<StudentTestSolutionDataModel>>(url);
    }

    getByTestId(testId: string){
        let url = `${this.baseControllerUrl}/Get/By/TestId/${testId}`;

        return this._httpClient.get<TestWithActiveSolutionModel>(url);
    }
}
