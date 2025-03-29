import { StudentGroupPaymentPlanSimpleModel } from "./course-shop-models";
import { DefaultCourseLandingPageModel } from "./default-course-landing-page-models";
import { StudentGroupAccessProlongationNotification } from "./group-access-models";
import { StudentGroupSimpleModel } from "./group-models";
import { PaymentSystemModel } from "./payment-system-models";

export interface StudentGroupInfoPageDetailedModel {
    isUserAuthorized: boolean;
    isStudent: boolean;
    displayOptions: DefaultCourseLandingDisplayOptions;
    groupInfo: StudentGroupSimpleModel;
    landingPage: DefaultCourseLandingPageModel;
    studentAccess: StudentGroupInfoPageDetailedStudentAccessModel;
    globalPaymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
    privatePaymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
    paymentSystems: Array<PaymentSystemModel>;
}

export interface DefaultCourseLandingDisplayOptions {
    notFoundPageTransparentLogoSrc: string; 
    defaultBackgroundImageSrc: string; 
}

export interface StudentGroupInfoPageDetailedStudentAccessModel {
    isBlocked: boolean;
    showProlongationPaymentPlans: boolean;
    notification: StudentGroupAccessProlongationNotification;
}

export interface GetStudentGroupInfoPageRequest {
    groupAliasOrId: string;
    timeZoneMinutesOffSet: number | null;
}