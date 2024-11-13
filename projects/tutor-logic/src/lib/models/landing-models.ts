import { CmsPageBlockModel, CmsPageModel } from "./cms-models";
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
    paymentPlans: Array<StudentGroupPaymentPlanSimpleModel>;
    blocks: Array<CmsPageBlockModel>;
    page: CmsPageModel;
}
