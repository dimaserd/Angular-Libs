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

export interface SearchFilesRequest {
    q: string;
    fileName: string;
    applicationId: string;
    fileTypes: Array<FileType>;
    count: number | null;
    offSet: number;
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

export interface FileSimpleModel {
    fileId: number;
    fileName: string;
    type: FileType;
    downloadUrl: string;
}

export interface UploadPublicFilesWithProgressEvent {
  loading: boolean;
  response?: PublicFilesUploadResponse;
  uploadingLoaded: number;
  uploadingTotal: number;
}

export interface PublicFilesUploadResponse {
  succeeded: boolean; 
  errorMessage: string; 
  fileIds: Array<number>; 
  filesUploadedEventId: string; 
}