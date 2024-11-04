export interface PrivateFileNameModel {
    id: string;
    setId: string;
    fileName: string;
    downloadUrl: string;
    createdOn: string;
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