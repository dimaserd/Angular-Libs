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

export interface QuestionStatisticComputingState {
    toComputeQuestionReportsCount: number;
    toComputeStudentSnapshotsCount: number;
    toComputeStudentGroupSnapshotsCount: number;
    dataOnUtc: string;
}

export interface StudentStatisticSnapshotValueModel {
    studentId: string;
    dataOnUtc: string;
    computedOnUtc: string;
    recomputingRequired: boolean;
    tags: Array<StudentStatisticSnapshotTagValueModel>;
    subjects: Array<StudentStatisticSnapshotSubjectValueModel>;
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