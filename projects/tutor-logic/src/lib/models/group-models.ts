import { StudentSimpleModel } from "./student-models";

export interface SearchStudentGroups {
    q: string; 
    count: number | null; 
    offSet: number; 
}

export interface StudentGroupSimpleModel {
    id: string; 
    name: string; 
    studentCount: number; 
    isDeleting: boolean; 
    useHtmlForName: boolean; 
    nameHtml: string; 
}

export interface StudentGroupDetailedModel {
    id: string; 
    name: string; 
    enterCode: string; 
    useCourse: boolean; 
    studentCount: number; 
    solutionsCount: number; 
    isDeleting: boolean; 
    useHtmlForName: boolean; 
    nameHtml: string; 
    useSchedule: boolean; 
    scheduleHtml: string; 
    useMaterials: boolean; 
    materialsHtml: string; 
}

export interface StudentInGroupSimpleModel {
    student: StudentSimpleModel; 
    isBlocked: boolean; 
    shouldBlockOnUtc: string; 
    enteredOnUtc: string; 
}

export interface SearchStudentsInGroup {
    groupId: string; 
    q: string; 
    hasIndividualPaymentPlans: boolean | null; 
    isBlocked: boolean | null; 
    count: number | null; 
    offSet: number; 
}

export interface StudentTestGroupRelationDetailedModel {
    studentGroupId: string; 
    testId: string; 
    canCheckSingleQuestion: boolean; 
    html: string;
    showHtml: boolean;
    testName: string;
    testDescription: string;
}

export interface SearchStudentGroupsByStudentRequest {
    studentId: string; 
    q: string; 
    count: number | null; 
    offSet: number; 
}

export interface StudentGroupWithCourseProgressModel {
    groupId: string; 
    groupName: string; 
    groupUseHtmlForName: boolean; 
    groupNameHtml: string; 
    isBlocked: boolean; 
    shouldBlockOnUtc: Date | null; 
    courseProgress: StudentGroupCourseProgressSimpleModel; 
}


export interface StudentGroupCourseProgressSimpleModel {
    totalWeight: number; 
    currentProgress: number; 
    progressPercents: number; 
}
