import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { GetListResult, FileType, SearchFilesRequest } from "./PublicFilesQueryService";
import {FileUnifiedModel} from "../components";

export interface PrivateFileNameModel {
    id: string;
    setId: string;
    fileName: string;
    type: FileType;
    downloadUrl: string;
    createdOn: string;
    applicationId: string;
}

@Injectable({
    providedIn: 'root'
})
export class PrivateFilesQueryService {

    private readonly _baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = `${baseUrl}api/private-files/query`;
    }

    public search(model: SearchFilesRequest): Observable<GetListResult<PrivateFileNameModel>> {
        return this._httpClient.post<GetListResult<PrivateFileNameModel>>(
            `${this._baseControllerUrl}/search`, model
        );
    }
}
