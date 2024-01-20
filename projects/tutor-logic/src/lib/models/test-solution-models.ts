import { CourseThemeItemModel } from "./course-models";
import { QuestionValidationSourceType } from "./solution-validation-models";

export interface SearchStudentTestSolutions {
    isFinished: boolean | null;
    studentId: string;
    count: number | null;
    offSet: number;
}

export interface TestSolutionCourseData {
    solutionId: string;
    courseThemeItemId: string;
    courseThemeItemIndex: number;
    courseThemeId: string;
    courseThemeName: string;
    courseName: string;
    courseId: string;
    nextItem: CourseThemeItemModel;
}

export enum TestQuestionType {
    SelectRightAnswerOrAnswers = 'SelectRightAnswerOrAnswers',
    TypeRightAnswer = 'TypeRightAnswer',
    DetailedAnswer = 'DetailedAnswer',
    TypeAnswerWithErrors = 'TypeAnswerWithErrors'
}

export interface SolutionWithAnswerModel {
    solutionId: string;
    answer: QuestionAnswer;
}

export interface StudentTestSolutionWithChatInfo {
    solution: StudentTestSolutionSimpleModel;
    systemValidation: TestSolutionSystemValidationModel;
    unreadMessagesCount: number;
}

export interface TestSolutionSystemValidationModel {
    studentTotalPoints: number;
    maxTotalPoints: number;
    questionsCount: number;
    validatedQuestionsCount: number;
    hasRightAnswerQuestionsCount: number;
}

export interface StartSolutionFromDirectory {
    workSpaceId: string;
    directoryId: string;
    useFilter: boolean;
    canCheckSingleQuestion: boolean;
    filter: QuestionsFilter;
}

export interface QuestionsFilter {
    types: Array<TestQuestionType>;
}

export interface StartTestSolutionByTestId {
    testId: string;
    studentGroupId: string;
    canCheckSingleQuestion: boolean;
}

export interface SearchMyTestSolutions {
    isFinished: boolean | null;
    testId: string;
    count: number | null;
    offSet: number;
}

export interface StudentTestSolutionSimpleModel {
    id: string;
    testName: string;
    testId: string;
    isFinished: boolean;
    startedOnUtc: Date;
    finishedOnUtc: Date | null;
}

export enum AnswerValidationResultType {
    NeedToCheckByYourSelf = <any>'NeedToCheckByYourSelf',
    NotCorrectAnswer = <any>'NotCorrectAnswer',
    PartiallyCorrectAnswer = <any>'PartiallyCorrectAnswer',
    CorrectAnswer = <any>'CorrectAnswer',
    InProccess = <any>'InProccess'
}

export interface SolutionWithAnswersModel {
    solutionId: string;
    answers: Array<QuestionAnswer>;
}

export interface StudentTestSolutionModel {
    studentId: string;
    solutionId: string;
    studentGroupId: string;
    hasCuratorValidation: boolean;
    canCheckSingleQuestion: boolean;
    startedOnUtc: Date;
    finishedOnUtc: Date | null;
    isFinished: boolean;
    solution: StudentTestSolutionDataModel;
    test: TestModel;
}


export interface StudentTestSolutionDataModel {
    /**
     * Есть ли вопросы, которые находятся в процессе расчёта результата
    */
    hasAnswersInProccess: boolean;
    answers: Array<QuestionAnswerWithResult>;
}

export interface TestModel {
    name: string;
    description: string;
    questions: Array<TestQuestionModel>;
}

export interface TestQuestionModel {
    id: string;
    title: string;
    titleBodyMarkUp: string;
    helpBodyMarkUp: string;
    answerExplanationMarkUp: string;
    titleBodyMarkUpMobile: string;
    helpBodyMarkUpMobile: string;
    answerExplanationMarkUpMobile: string;
    type: TestQuestionType;
    selectRightAnswerOrAnswersData: SelectRightAnswerOrAnswersQuestionData;
    typeRightAnswerQuestionData: TypeRightAnswerQuestionData;
    typeAnswerWithErrorsData: TypeAnswerWithErrorsQuestionData;
}

export interface TypeAnswerWithErrorsQuestionData {
    rightAnswer: string;
}


export interface TestWithActiveSolutionModel {
    testId: string;
    activeSolutionId: string;
    test: TestModel;
}

export interface QuestionAnswer {
    questionId: string;
    answerOrAnswers: string;
}

export interface QuestionAnswerWithResult {
    isChecked: boolean;
    questionId: string;
    answerOrAnswers: string;
    pointsValidation: QuestionPointsValidationModel;
    resultType: AnswerValidationResultType;
}

export interface QuestionPointsValidationModel {
    errorOccured: boolean; 
    inProccess: boolean; 
    answerPoints: number; 
    questionTotalPoints: number; 
    description: string; 
    isValidated: boolean; 
    sourceType: QuestionValidationSourceType; 
    validatorId: string; 
}


export interface SelectRightAnswerOrAnswersQuestionData {
    selectRightAnswerTitle: string;
    rightAnswersCount: number;
    answers: Array<Answer>;
}


export interface Answer {
    text: string;
    isRightAnswer: boolean;
}


export interface TypeRightAnswerQuestionData {
    caseInSensitive: boolean;
    rightAnswers: Array<string>;
}