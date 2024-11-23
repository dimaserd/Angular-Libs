import { TestQuestionModel, TestQuestionType } from "./question-models";

export interface StudentTestQuestionStatisticDetailedModel {
    id: string;
    studentId: string;
    questionVersionId: string;
    errorsAnswersCount: number;
    almostRightAnswersCount: number;
    rightAnswersCount: number;
    score: number;
    question: TestQuestionModel;
}

export interface SearchTestQuestionErrorsStatisticRequest {
    studentId: string;
    questionTypes: Array<TestQuestionType>;
    orderType: TestQuestionErrorsStatisticOrderType;
    count: number | null;
    offSet: number;
}

export enum TestQuestionErrorsStatisticOrderType {
    MostErrors = 'MostErrors',
    RecentErrors = 'RecentErrors'
}

export interface QuestionErrorStatisticsComputingState {
    toComputeReportsCount: number;
}