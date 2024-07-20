import { BaseApiResponse } from "./models";

export interface BaseApiResponseWithFilesIds extends BaseApiResponse {
    responseObject: number[];
}

export interface DbFileNoDataWithRelations {
    id: number;
    fileName: string;
    relations: Array<FileRelationModel>;
}

export interface FileRelationModel {
    entityTypeFullName: string;
    entityKey: string;
    relationName: string;
    relationValue: string;
    relationCustomData: string;
}

export interface SearchFiles {
    fileName: string;
    q: string;
    count: number | null;
    offSet: number;
}

export interface FileSimpleModel {
    fileId: number;
    fileName: string;
    type: FileType;
    downloadUrl: string;
}


export enum FileType {
    Undefined = 'Undefined',
    Unknown = 'Unknown',
    Image = 'Image',
    Audio = 'Audio',
    Video = 'Video',
    Document = 'Document',
    Archive = 'Archive'
}