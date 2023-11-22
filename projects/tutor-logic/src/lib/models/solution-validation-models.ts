import { QuestionAnswerWithResult } from "./test-solution-models";

export interface TestSolutionWithPointsValidation {
    solutionId: string; 
    hasPointsResult: boolean; 
    questions: Array<QuestionAnswerWithResult>; 
    studentTotalPoints: number; 
    maxTotalPoints: number; 
    questionsCount: number; 
    validatedQuestionsCount: number; 
    inProccessQuestionsCount: number; 
    hasRightAnswerQuestionsCount: number; 
}

export enum QuestionValidationSourceType {
	System = <any> 'System',
	Student = <any> 'Student',
	Curator = <any> 'Curator'
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