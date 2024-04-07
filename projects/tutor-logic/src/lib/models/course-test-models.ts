import { TestRestrictionValidationWithDeadLineWarningResult } from "./test-restriction-models";

export interface StudentCourseItemTestSolution {
    solutionId: string; 
    startedOnUtc: string; 
    isFinished: boolean; 
    validation: StudentCourseItemTestSolutionValidationModel; 
    totalPointsToPass: number; 
}

export interface StudentCourseItemTestSolutionValidationModel {
    studentTotalPoints: number;
    maxTotalPoints: number;
    pointsPercentage: number;
}

export interface CourseThemeSolutionsWithTestRestrictionsViewModel {
    solutions: Array<StudentCourseItemTestSolution>; 
    restrictionResult: TestRestrictionValidationWithDeadLineWarningResult; 
}