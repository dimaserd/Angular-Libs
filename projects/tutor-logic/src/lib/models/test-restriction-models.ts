import { StudentSimpleModel } from "./student-models";

export interface CourseItemGlobalTestRestrictionModel {
    courseThemeItemId: string;
    testRestriction: TestRestrictionModel;
}

export interface TestRestrictionModel {
    maxTriesCount: number | null;
    maxStartDate: string | null;
}

export interface SearchStudentThemeItemTestRestrictionsRequest {
    q: string;
    courseThemeItemId: string;
    count: number | null;
    offSet: number;
}

export interface ThemeItemTestStudentRestrictionModel {
    restriction: TestRestrictionModel;
    student: StudentSimpleModel;
}

export interface CourseItemStudentTestRestrictionModel {
    courseThemeItemId: string;
    studentId: string;
    testRestriction: TestRestrictionModel;
}

export interface TestRestrictionValidationResult {
    testRestriction: TestRestrictionModel;
    canStartTest: boolean;
    restrictionRuleType: TestRestrictionValidationResultRuleType | null;
    validationMessage: string;
    solutionsCount: number;
    attemptsLeft: number;
}

export enum TestRestrictionValidationResultRuleType {
    DateExpired = 'DateExpired',
    AttemptsExceeded = 'AttemptsExceeded'
}

export interface GetCourseThemeItemStudentTestRestrictionRequest {
    courseThemeItemId: string;
    studentId: string;
}

export interface TestRestrictionValidationWithDeadLineWarningResult {
    deadLineWarning: DeadLineWithWarningMessage;
    restrictionValidationResult: TestRestrictionValidationResult;
}

export interface CourseThemeItemStudentDeadlineWarningModel {
    themeItemId: string;
    courseThemeId: string;
    deadLine: string;
    warningMessage: string;
}

export interface GetStudentCourseThemeItemsDeadlineWarningsRequest {
    courseId: string;
    studentId: string;
}

export interface CourseThemeIdWithDeadlineWarnings {
    courseThemeId: string;
    deadlines: Array<DeadLineWithWarningMessage>;
}

export interface DeadLineWithWarningMessage {
    deadLine: string;
    warningMessage: string;
}
