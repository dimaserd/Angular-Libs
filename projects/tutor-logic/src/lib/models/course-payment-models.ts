import { StudentGroupSimpleModel } from "./group-models";
import { StudentSimpleModel } from "./student-models";

export interface AddCoursePaymentRequest {
    planId: string;
    isPrivatePaymentPlan: boolean;
    type: StudentCoursePaymentType;
    courseId: string;
    source: string;
    sourceDescription: string;
    paymentSystemId: string;
}

export enum StudentCoursePaymentType {
    BuyCourse = 'BuyCourse',
    ExtendSubscription = 'ExtendSubscription'
}

export interface AddCoursePaymentResult {
    succeeded: boolean;
    coursePaymentId: string;
    errorMessage: string;
}

export interface SetPaymentSystemForCoursePayment {
    coursePaymentId: string;
    paymentSystemId: string;
}

export interface DemoPaymentDescription {
    html: string;
}

export interface StudentCoursePaymentModel {
    id: string;
    name: string;
    description: string;
    courseName: string;
    courseMiniHtml: string;
    courseDetailedHtml: string;
    daysLength: number;
    amount: number;
    amountString: string;
    paymentId: string;
    studentGroupId: string;
    paymentSystemId: string;
    paymentSystemProviderName: string;
    isFinished: boolean;
    isPaid: boolean;
    type: StudentCoursePaymentType;
    studentProcessedToGroup: boolean;
    hasError: boolean;
    errorType: string;
    errorMessage: string;
    providerErrorType: string;
    providerErrorMessage: string;
    createdOnUtc: string;
    paidOnUtc: string;
    finishedOnUtc: string;
}

export interface SearchStudentCoursePaymentsRequest {
    q: string;
    studentId: string;
    groupId: string;
    isPaid: boolean | null;
    paymentType: StudentCoursePaymentType | null;
    hasError: boolean | null;
    count: number | null;
    offSet: number;
}


export interface StudentCoursePaymentDetailedModel {
    id: string;
    name: string;
    description: string;
    courseName: string;
    courseMiniHtml: string;
    courseDetailedHtml: string;
    daysLength: number;
    amount: number;
    amountString: string;
    paymentId: string;
    paymentSystemId: string;
    paymentSystemProviderName: string;
    isFinished: boolean;
    isPaid: boolean;
    studentProcessedToGroup: boolean;
    hasError: boolean;
    errorType: string;
    errorMessage: string;
    createdOnUtc: string;
    paidOnUtc: string;
    finishedOnUtc: string;
    type: StudentCoursePaymentType;
    student: StudentSimpleModel;
    group: StudentGroupSimpleModel;
}

export interface EnumValueTypeWithDescriptionStudentCoursePaymentType {
    type: StudentCoursePaymentType;
    description: string;
}