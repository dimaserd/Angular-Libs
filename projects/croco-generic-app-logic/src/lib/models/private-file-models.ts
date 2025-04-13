import { FileType } from "./file-models";

export interface PrivateFileNameModel {
    id: string;
    setId: string;
    fileName: string;
    type: FileType;
    downloadUrl: string;
    createdOn: string;
    applicationId: string;
}

export interface PrivateFilesCreatedResult {
    succeeded: boolean;
    errorMessage: string;
    setId: string;
    fileIds: Array<string>;
}

export interface UploadPrivateFilesWithProgressResult {
    loading: boolean;
    uploadingLoaded: number;
    uploadingTotal: number;
    setId: string;
}