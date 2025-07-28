import { StudentGroupSimpleModel } from "./group-models";

export interface CreateCourseOrderRequest {
    courseId: string;
    tariffId: string;
    isFreeOfCharge: boolean;
    source: string;
    sourceDescription: string;
}

export interface CreateCourseOrderResponse {
    succeeded: boolean;
    id: string;
    errorMessage: string;
}

export interface CourseOrderModel {
    id: string;
    courseId: string;
    tariffId: string;
    isFreeOfCharge: boolean;
    userId: string;
    isFinished: boolean;
    courseWithPlans: StudentGroupWithPaymentPlansModel;
}

export interface CourseShopWindowDetailedModel {
    id: string;
    name: string;
    description: string;
    courses: Array<CourseShopWindowItemDetailedModel>;
    dataOnUtc: string;
}

export interface CourseShopWindowItemDetailedModel {
    id: string;
    name: string;
    getCourseMiniHtml: string;
    getCourseDetailedHtml: string;
    studentGroup: StudentGroupSimpleModel;
    cardOptions: CourseShopWindowItemCardOptionsModel;
    globalPaymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
}

export interface CourseShopWindowItemModel {
    id: string;
    name: string;
    studentGroup: StudentGroupSimpleModel;
    cardOptions: CourseShopWindowItemCardOptionsModel;
}

export interface CourseShopWindowItemCardOptionsModel {
    color: string;
    imageSrc: string;
}

export interface StudentGroupWithPaymentPlansModel {
    studentGroupName: string;
    studentGroupId: string;
    studentGroupAlias: string;
    getCourseMiniHtml: string;
    getCourseDetailedHtml: string;
    isFreeOfCharge: boolean;
    paymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
}

export interface StudentGroupPaymentPlanSimpleModel {
    id: string;
    name: string;
    description: string;
    daysLength: number;
    amount: number;
}

export interface StudentGroupPaymentPlansModel {
    id: string;
    alias: string;
    isFreeOfCharge: boolean;
    globalPaymentPlans: Array<StudentGroupGlobalPaymentPlanModel>;
}


export interface StudentGroupGlobalPaymentPlanModel {
    id: string;
    name: string;
    description: string;
    daysLength: number;
    amount: number;
    defaultLandingPageUrl: string;
}
