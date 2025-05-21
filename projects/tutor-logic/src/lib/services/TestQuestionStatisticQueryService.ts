import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { AggregatedStudentStatisticsResult, GetAggregatedStudentStatisticsRequest, GetListResult, QuestionErrorStatisticsComputingState, SearchTestQuestionErrorsStatisticRequest, StudentTestQuestionStatisticDetailedModel } from "../models";

@Injectable({ providedIn: 'root' })
export class TestQuestionStatisticQueryService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/question-statistic';
  }

  search(model: SearchTestQuestionErrorsStatisticRequest) {
    return this._httpClient.post<GetListResult<StudentTestQuestionStatisticDetailedModel>>(
      `${this.baseControllerUrl}/query/search`,
      model
    );
  }

  searchAggregated(model: GetAggregatedStudentStatisticsRequest) {
    return this._httpClient.post<AggregatedStudentStatisticsResult>(
      `${this.baseControllerUrl}/query/search-aggregated`,
      model
    );
  }

  getState() {
    return this._httpClient.get<QuestionErrorStatisticsComputingState>(`${this.baseControllerUrl}/state`);
  }
}
