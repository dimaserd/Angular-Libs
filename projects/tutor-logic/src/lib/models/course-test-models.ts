import { TestRestrictionValidationWithDeadLineWarningResult } from "./test-restriction-models";

export interface StudentCourseModulePageTestSolutionValidationModel {
    studentTotalPoints: number;
    maxTotalPoints: number;
    pointsPercentage: number;
}


export interface StudentCourseModulePageTestSolution {
    solutionId: string;
    startedOnUtc: string;
    isFinished: boolean;
    isCompleted: boolean;
    validation: StudentCourseModulePageTestSolutionValidationModel;
    totalPointsToPass: number;
    totalPointsPercentageToPass: number;
    testId: string;
}

export interface CourseModulePageTestSolutionRestrictionsModel {
    testId: string;
    testName: string;
    finished: boolean;
    solutions: Array<StudentCourseModulePageTestSolution>;
    restrictionResult: TestRestrictionValidationWithDeadLineWarningResult;
}