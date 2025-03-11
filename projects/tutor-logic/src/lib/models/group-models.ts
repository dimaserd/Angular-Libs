import { IconSimpleModel } from "./icon-models";
import { StudentSimpleModel } from "./student-models";

export interface SearchStudentGroups {
    q: string;
    count: number | null;
    offSet: number;
}

export interface StudentGroupSimpleModel {
    id: string;
    alias: string;
    name: string;
    isDeleting: boolean;
    useHtmlForName: boolean;
    useCourse: boolean;
    nameHtml: string;
    isFreeOfCharge: boolean;
}

export interface StudentGroupDetailedModel {
    id: string;
    name: string;
    alias: string;
    enterCode: string;
    useCourse: boolean;
    studentsCount: number;
    solutionsCount: number;
    isDeleting: boolean;
    useHtmlForName: boolean;
    nameHtml: string;
    useSchedule: boolean;
    scheduleId: string;
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
    iconSetId: string | null;
    count: number | null;
    offSet: number;
}

export interface StudentGroupWithCourseProgressModel {
    groupId: string;
    groupName: string;
    groupUseHtmlForName: boolean;
    groupNameHtml: string;
    useCourse: boolean;
    isBlocked: boolean;
    shouldBlockOnUtc: string | null;
    courseProgress: StudentGroupCourseProgressSimpleModel;
    icon: IconSimpleModel;
}

export interface StudentGroupCourseProgressSimpleModel {
    totalWeight: number;
    currentProgress: number;
    progressPercents: number;
}
