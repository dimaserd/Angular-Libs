import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { DbFileNoDataWithRelations, FileSimpleModel, SearchFilesRequest } from "../models/file-models";
import { GetListResult } from "../models";

@Injectable({
    providedIn: 'root'
})
export class PublicFilesQueryService {

    private readonly _baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = `${baseUrl}Api/Files`;
    }

    public getFilesWithRelations(model: SearchFilesRequest): Observable<GetListResult<DbFileNoDataWithRelations>> {
      return this._httpClient.post<GetListResult<DbFileNoDataWithRelations>>(
        `${this._baseControllerUrl}/GetFiles/WithRelations`,
        model
      );
    }

    public search(model: SearchFilesRequest): Observable<GetListResult<FileSimpleModel>> {
        return this._httpClient.post<GetListResult<FileSimpleModel>>(
            `${this._baseControllerUrl}/GetFiles`, model
        );
    }
}
