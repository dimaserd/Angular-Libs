import { QuestionAnswerWithResult } from "./test-solution-models";

export interface TestSolutionWithPointsValidation {
    solutionId: string;
    isFinished: boolean;
    hasPointsResult: boolean;
    questions: Array<QuestionAnswerWithResult>;
    studentTotalPoints: number;
    maxTotalPoints: number;
    questionsCount: number;
    validatedQuestionsCount: number;
    inProcessQuestionsCount: number;
    hasRightAnswerQuestionsCount: number;
}

export enum QuestionValidationSourceType {
    System = 'System',
    Student = 'Student',
    Curator = 'Curator'
}

export interface TestQuestionWithModifiers {
    questionId: string;
    modifiers: Array<TestQuestionModiferModel>;
}

export interface TestQuestionModiferModel {
    name: string;
    data: string;
}

export interface SaveQuestionPointsValidation {
    idModel: QuestionInSolutionIdModel;
    answerPoints: number;
    questionTotalPoints: number;
    description: string;
}

export interface QuestionInSolutionIdModel {
    solutionId: string;
    questionId: string;
}