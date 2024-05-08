export interface CourseLandingPageDataModel {
    id: string;
    dataJson: string;
    dataType: string;
}

export interface CourseLandingPageSimpleModel {
    id: string;
    name: string;
    description: string;
}

export interface SearchCourseLandingPageRequest {
    studentGroupId: string;
    count: number | null;
    offSet: number;
}