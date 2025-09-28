import { CourseThemeItemModel } from "./course-models";
import { TestQuestionModel, TestQuestionType } from "./question-models";
import { QuestionValidationSourceType } from "./solution-validation-models";
import { TestQuestionErrorsStatisticOrderType } from "./student-statistic-models";

export interface SearchStudentTestSolutionsRequest {
    isFinished: boolean | null;
    studentId: string;
    testId: string;
    withUnreadMessages: boolean;
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

export interface SolutionWithAnswerModel {
    solutionId: string;
    answer: QuestionAnswer;
}

export interface QuestionAnswer {
    questionId: string;
    answerOrAnswers: string;
}

export interface StudentTestSolutionWithChatInfo {
    solution: StudentTestSolutionSimpleModel;
    systemValidation: TestSolutionSystemValidationModel;
    unreadMessagesCount: number;
}

export interface TestSolutionSystemValidationModel {
    studentTotalPoints: number;
    studentProgressPercents: number;
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

export interface CreateTestForStudentErrorsRequest {
    testName: string;
    questionsCount: number;
    questionTypes: Array<TestQuestionType>;
    orderType: TestQuestionErrorsStatisticOrderType;
    canCheckSingleQuestion: boolean;
}

export interface TestSolutionCreatedResult {
    succeeded: boolean;
    errorMessage: string;
    solutionId: string;
}

export interface QuestionsFilter {
    types: Array<TestQuestionType>;
}

export interface StartTestSolutionByTestId {
    testId: string;
    studentGroupId: string;
    canCheckSingleQuestion: boolean;
}

export interface SearchMyTestSolutionsRequest {
    isFinished: boolean | null;
    testId: string;
    withUnreadMessages: boolean;
    count: number | null;
    offSet: number;
}

export interface StudentTestSolutionSimpleModel {
    id: string;
    testName: string;
    testId: string;
    isFinished: boolean;
    startedOnUtc: string; /* Date */
    finishedOnUtc: string | null; /* Date */
}

export enum AnswerValidationResultType {
    NeedToCheckByYourSelf = 'NeedToCheckByYourSelf',
    NotCorrectAnswer = 'NotCorrectAnswer',
    PartiallyCorrectAnswer = 'PartiallyCorrectAnswer',
    CorrectAnswer = 'CorrectAnswer',
    InProcess = 'InProcess'
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
    startedOnUtc: string; /* Date */
    finishedOnUtc: string | null; /* Date */
    isFinished: boolean;
    solution: StudentTestSolutionDataModel;
    test: TestModel;
}


export interface StudentTestSolutionDataModel {
    /**
     * Есть ли вопросы, которые находятся в процессе расчёта результата
    */
    hasAnswersInProcess: boolean;
    answers: Array<QuestionAnswerWithResult>;
}

export interface TestModel {
    name: string;
    description: string;
    questions: Array<TestQuestionModel>;
}

export interface TestWithActiveSolutionModel {
    testId: string;
    activeSolutionId: string;
    test: TestModel;
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
    inProcess: boolean;
    answerPoints: number;
    questionTotalPoints: number;
    description: string;
    isValidated: boolean;
    sourceType: QuestionValidationSourceType;
    validatorId: string;
}

export interface StudentTestSolutionDetailedModel {
    solutionId: string;
    hasAnswersInProcess: boolean;
    hasCuratorValidation: boolean;
    canCheckSingleQuestion: boolean;
    studentId: string;
    startedOnUtc: string;
    finishedOnUtc: string | null;
    isFinished: boolean;
    marketingOptions: SolutionMarketingOptions;
    test: StudentTestSolutionDetailedTestModel;
}

export interface SolutionMarketingOptions {
    showAfterSolutionMarkUp: boolean;
    afterSolutionMarkUp: string;
}

export interface StudentTestSolutionDetailedTestModel {
    name: string;
    description: string;
    questions: Array<StudentTestSolutionDetailedTestQuestion>;
}

export interface StudentTestSolutionDetailedTestQuestion {
    question: TestQuestionModel;
    answerWithValidation: QuestionAnswerWithResult;
    isQuestionLikedByStudent: boolean;
}
