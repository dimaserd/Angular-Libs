import { CourseDetailedModel } from "./course-models";
import { StudentGroupPaymentPlanSimpleModel } from "./course-shop-models";

export interface GetStudentGroupCourseAccessRequest {
    groupId: string;
    timeZoneMinutesOffSet: number | null;
}

export interface StudentGroupCourseWithDetailedAccessModel {
    id: string;
    hasAccess: boolean;
    name: string;
    alias: string;
    useCourse: boolean;
    useHtmlForName: boolean;
    nameHtml: string;
    useMaterials: boolean;
    materialsHtml: string;
    course: CourseDetailedModel;
    isBlocked: boolean;
    shouldBlockOnUtc: string | null;
    notification: StudentGroupAccessProlongationNotification;
    showProlongationPaymentPlans: boolean;
    isFreeOfCharge: boolean;
    globalPaymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
    privatePaymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
}


export interface StudentGroupAccessProlongationNotification {
    title: string;
    text: string;
}