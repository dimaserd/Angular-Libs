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
    isLastAnswerCorrect: boolean | null;
    isActualQuestionVersion: boolean | null;
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

export interface QuestionStatisticComputingState {
    toComputeQuestionReportsCount: number;
    notActualQuestionVersionReportsCount: number;
    toComputeStudentSnapshotsCount: number;
    toComputeStudentGroupSnapshotsCount: number;
    toComputeAggregatedSnapshotRequestsCount: number;
    dataOnUtc: string;
}

export interface StudentStatisticSnapshotValueModel {
    studentId: string;
    dataOnUtc: string;
    computedOnUtc: string;
    recomputingRequired: boolean;
    checkedQuestionsCount: number;
    tags: Array<StudentStatisticSnapshotTagValueModel>;
    subjects: Array<StudentStatisticSnapshotSubjectValueModel>;
}

export interface StudentStatisticSnapshotValueDebugInfoModel {
    hasSnapshot: boolean;
    studentId: string;
    dataOnUtc: string;
    computedOnUtc: string;
    recomputingRequired: boolean;
    lastRecomputingRequiredSetOnUtc: string;
    checkedQuestionsCount: number;
    lastQuestionAnsweredOnUtc: string;
    lastQuestionAggregateComputedOnUtc: string;
}

export interface StudentStatisticSnapshotTagValueModel {
    tagId: string;
    tagDisplayName: string;
    statistic: ComputedStatisticPresentationModel;
}

export interface ComputedStatisticPresentationModel {
    errorsAnswersCount: number;
    almostRightAnswersCount: number;
    rightAnswersCount: number;
    score: number;
    attemptsWithScoreTotalCount: number;
    totalAttemptsCount: number;
    successRatePercents: string;
    successRateRankValue: number;
    earnedPoints: number;
    totalPoints: number;
}

export interface StudentStatisticSnapshotSubjectValueModel {
    subjectId: string;
    subjectName: string;
    statistic: ComputedStatisticPresentationModel;
}