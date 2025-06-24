import { StudentSimpleModel } from "./student-models";

export interface StartCourseThemeRequest {
    themeProgressId: string;
}

export interface UpdateStudentCourseThemeProgressRequest {
    studentProgressId: string;
    themeId: string;
    currentItemIndex: number;
    currentProgress: number;
}

export interface StartCourseThemeItemTestRequest {
    studentProgressId: string;
    itemId: string;
}

export interface StartCourseThemeItemTestResult {
    succeeded: boolean;
    solutionId: string;
    errorMessage: string;
}

export interface FinishStudentCourseThemeProgressRequest {
    studentProgressId: string;
    themeId: string;
}

export interface UpdateStudentCourseThemeProgressResult {
    succeeded: boolean;
    errorMessage: string;
    progress: StudentCourseProgressModel;
}

export interface StudentCourseProgressModel {
    id: string;
    studentId: string;
    courseId: string;
    currentProgress: number;
    courseTotalWeight: number;
    currentThemeIndex: number;
    currentProgressPercents: number;
    themes: Array<StudentCourseThemeProgressModel>;
    lastTheme: StudentCourseThemeProgressModel;
}

export interface StudentCourseThemeProgressModel {
	 id: string; 
	 themeId: string; 
	 isStarted: boolean; 
	 isRestricted: boolean; 
	 currentProgress: number; 
	 currentItemIndex: number; 
	 themeTotalWeight: number; 
	 currentProgressPercents: number; 
	 isFinished: boolean; 
	 finishedOnUtc: string; 
	 updatedOnUtc: string; 
}

export interface SearchCourseProgressesRequest {
    courseId: string;
    count: number | null;
    offSet: number;
}

export interface StudentCourseProgressWithStudentModel {
    id: string;
    student: StudentSimpleModel;
    courseId: string;
    currentProgress: number;
    courseTotalWeight: number;
    currentThemeIndex: number;
    currentProgressPercents: number;
}