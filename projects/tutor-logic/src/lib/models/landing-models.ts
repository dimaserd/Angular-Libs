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

export interface CourseLandingPageDetailedModel {
    id: string;
    name: string;
    studentGroupId: string;
    description: string;
    dataJson: string;
    dataType: string;
    blocks: Array<CourseLandingPageBlockModel>;
}

export interface CourseLandingPageBlockModel {
    id: string;
    versionId: string;
    name: string;
    description: string;
    dataJson: string;
    dataType: string;
}