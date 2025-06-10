import { ComputedStatisticPresentationModel } from "./student-statistic-models";

export interface GetStudentInGroupStatisticSnapshotRequest {
    groupId: string;
    studentId: string;
    snapshotId: string;
}

export interface StudentInGroupStatisticSnapshotModel {
    snapshotId: string;
    studentGroupName: string;
    actualFromUtc: string;
    createdOnUtc: string;
    subjectValues: Array<StudentInGroupStatisticBySubjectSnapshotValueModel>;
    tagValues: Array<StudentInGroupStatisticByTagSnapshotValueModel>;
}

export interface StudentInGroupStatisticBySubjectSnapshotValueModel {
    id: string;
    subjectName: string;
    subjectId: string;
    place: number;
    studentsWithSameResultCount: number;
    statistic: ComputedStatisticPresentationModel;
}


export interface StudentInGroupStatisticByTagSnapshotValueModel {
    id: string;
    tagDisplayName: string;
    place: number;
    studentsWithSameResultCount: number;
    statistic: ComputedStatisticPresentationModel;
}