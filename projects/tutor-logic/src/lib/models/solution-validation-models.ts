import { AnswerValidationResultType } from "./test-solution-models";

export interface TestSolutionWithPointsValidation {
    solutionId: string; 
    hasPointsResult: boolean; 
    noPointsValidation: boolean; 
    questions: Array<TestQuestionWithPointsValidation>; 
    studentTotalPoints: number; 
    maxTotalPoints: number; 
    questionsCount: number; 
    validatedQuestionsCount: number; 
    hasRightAnswerQuestionsCount: number; 
}

export interface TestQuestionWithPointsValidation {
    questionId: string; 
    answerPoints: number; 
    questionTotalPoints: number; 
    description: string; 
    isValidated: boolean; 
    resultType: AnswerValidationResultType; 
    sourceType: QuestionValidationSourceType; 
    validatorId: string; 
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

