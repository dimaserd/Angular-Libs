import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface GetListResult<T> {

    /*
    Сколько всего записей
     */
    totalCount: number;

    /*
    Текущий список
     */
    list: Array<T>;
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


export interface GetListSearchModel {
    count: number | null;
    offSet: number;
}

export interface FileSimpleModel {
    fileId: number; 
    fileName: string; 
    type: FileType; 
    downloadUrl: string; 
}

@Injectable({
    providedIn: 'root'
})
export class PublicFilesQueryService {

    private readonly _baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = `${baseUrl}Api/Files`;
    }

    public search(model: SearchFilesRequest): Observable<GetListResult<FileSimpleModel>> {
        return this._httpClient.post<GetListResult<FileSimpleModel>>(
            `${this._baseControllerUrl}/GetFiles`, model
        );
    }
}
