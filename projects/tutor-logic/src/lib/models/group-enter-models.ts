export interface GetToGroupByCodeRequest {
    enterCode: string; 
}

export interface GetToGroupByCodeResponse {
    succeeded: boolean; 
    errorMessage: string; 
    groupId: string; 
    groupName: string; 
}