import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { GetListResult, QuestionErrorStatisticsComputingState, SearchTestQuestionErrorsStatisticRequest, StudentTestQuestionStatisticDetailedModel } from "../models";

@Injectable({ providedIn: 'root' })
export class TestQuestionErrorStatisticQueryService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/question-error-statistic';
  }

  search(model: SearchTestQuestionErrorsStatisticRequest) {
    return this._httpClient.post<GetListResult<StudentTestQuestionStatisticDetailedModel>>(
      `${this.baseControllerUrl}/query/search`,
      model
    );
  }

  getState() {
    return this._httpClient.get<QuestionErrorStatisticsComputingState>(`${this.baseControllerUrl}/state`);
  }
}
