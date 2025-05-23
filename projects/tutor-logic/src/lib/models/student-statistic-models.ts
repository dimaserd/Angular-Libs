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

export interface GetAggregatedStudentStatisticsRequest {
    studentId: string;
    subjectId: string;
    computeSubjects: boolean;
    questionTags: Array<string>;
    tagsCount: number;
}

export interface AggregatedStudentStatisticsResult {
    studentId: string;
    subjects: Array<SubjectAggregatedStatisticModel>;
    questionTags: Array<QuestionTagAggregatedStatisticModel>;
}

export interface SubjectAggregatedStatisticModel {
    subjectId: string;
    subjectName: string;
    statistic: ComputedStatisticModel;
}

export interface ComputedStatisticModel {
    errorsAnswersCount: number;
    almostRightAnswersCount: number;
    rightAnswersCount: number;
    score: number;
    attemptsInScoreTotalCount: number;
    totalAttemptsCount: number;
    successRate: number;
}

export interface QuestionTagAggregatedStatisticModel {
    tagId: string;
    tagDisplayName: string;
    statistic: ComputedStatisticModel;
}