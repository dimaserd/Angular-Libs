export interface CreateCourseOrderRequest {
    courseId: string;
    tariffId: string;
    isFreeOfCharge: boolean;
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
    courses: Array<StudentGroupWithPaymentPlansModel>;
}

export interface StudentGroupWithPaymentPlansModel {
    studentGroupName: string;
    studentGroupId: string;
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
    isFreeOfCharge: boolean;
    globalPaymentPlans: StudentGroupPaymentPlanSimpleModel[];
}



