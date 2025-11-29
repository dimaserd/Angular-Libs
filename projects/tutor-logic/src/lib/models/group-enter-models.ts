import { StudentGroupType } from "./group-models";

export interface GetToGroupByCodeRequest {
    enterCode: string;
}

export interface EnterGroupResponse {
    succeeded: boolean;
    errorMessage: string;
    groupId: string;
    groupName: string;
    groupType: StudentGroupType;
}