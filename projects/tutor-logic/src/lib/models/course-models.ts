export interface CourseDetailedModel {
    id: string; 
    name: string; 
    templateId: string; 
    weight: number; 
    versionId: string; 
    themes: Array<CourseThemeDetailedModel>; 
}

export interface CourseSimpleModel {
    id: string; 
    name: string; 
    weight: number; 
    versionId: string; 
}

export interface CourseThemeDetailedModel {
    id: string; 
    name: string; 
    description: string; 
    weight: number; 
    courseVersionId: string; 
    items: Array<CourseThemeItemModel>; 
}


export interface CourseThemeItemModel {
    id: string; 
    name: string; 
    html: string; 
    type: CourseThemeItemType; 
    weight: number; 
    templateItemId: string; 
    test: CourseThemeItemTestModel; 
}


export enum CourseThemeItemType {
   JustHtml = 'JustHtml',
   Test = 'Test'
}

export interface CourseThemeItemTestModel {
    testId: string; 
    testName: string; 
    totalPointsToPass: number; 
    totalPercentageToPass: number; 
}