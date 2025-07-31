import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileSimpleModel, GetListResult, SearchFilesRequest } from "./file-models";

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
