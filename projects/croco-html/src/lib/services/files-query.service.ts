import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface GetListResult<T>{

  /*
  Сколько всего записей
   */
  totalCount:number;

  /*
  Текущий список
   */
  list:Array<T>;
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

export interface GetListSearchModel {
    count: number | null;
    offSet: number;
}

export interface FileNameAndIdModel {
    fileId: number;
    fileName: string;
}

@Injectable({
    providedIn: 'root'
})
export class FilesQueryService{

    _baseControllerUrl: string;

    constructor(private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = baseUrl + 'Api/Files/';
    }

    public getFilesWithRelations(model: SearchFiles):Observable<GetListResult<DbFileNoDataWithRelations>>{
        return this._httpClient.post<GetListResult<DbFileNoDataWithRelations>>(
            this._baseControllerUrl + `GetFiles/WithRelations`, model
        );
    }

    public getFiles(model: SearchFiles):Observable<GetListResult<FileNameAndIdModel>>{
        return this._httpClient.post<GetListResult<FileNameAndIdModel>>(
            this._baseControllerUrl + `GetFiles`, model
        );
    }
}
