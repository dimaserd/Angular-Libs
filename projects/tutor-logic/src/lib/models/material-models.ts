export interface SearchStudentGroupMaterialsRequest {
    studentId: string;
    count: number | null;
    offSet: number;
}

export interface StudentGroupWithMaterialsModel {
    groupId: string;
    groupName: string;
    materialsHtml: string;
    isBlockedInGroup: boolean;
}