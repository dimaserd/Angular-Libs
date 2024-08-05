import { StudentGroupPaymentPlanSimpleModel } from "./course-shop-models";

export interface CourseLandingPageSimpleModel {
    id: string;
    name: string;
    description: string;
    groupId: string;
    groupName: string;
}

export interface SearchCourseLandingPageRequest {
    studentGroupId: string;
    count: number | null;
    offSet: number;
}

export interface CourseLandingPageDetailedModel {
    id: string;
    name: string;
    studentGroupId: string;
    isFreeOfCharge: boolean;
    description: string;
    dataJson: string;
    dataType: string;
    blocks: Array<CourseLandingPageBlockModel>;
    paymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
    pageData: LandingPageData;
}

export interface LandingPageData {
    title: string;
    navigationItems: Array<LandingPageNavigationItem>;
}

export interface LandingPageNavigationItem {
    id: string;
    name: string;
}

export interface CourseLandingPageBlockModel {
    id: string;
    versionId: string;
    name: string;
    description: string;
    dataJson: string;
    dataType: string;
    isVisible: boolean;
}