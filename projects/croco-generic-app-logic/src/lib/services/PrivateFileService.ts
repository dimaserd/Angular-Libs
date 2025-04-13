import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BaseApiResponse, GetListResult, SearchFilesRequest } from "../models";
import { PrivateFileNameModel } from "../models/private-file-models";

@Injectable({
    providedIn: 'root',
})
export class PrivateFileService {
    _baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseControllerUrl = `${baseUrl}api/private-files`;
    }

    public getDownloadUrl(id: string): string {
        return `${this._baseControllerUrl}/download?id=${id}`
    }

    public setDownloadUrl(count: number) {

        let url = `${this._baseControllerUrl}/set-download-url?count=${count}`;

        return this._httpClient.post<BaseApiResponse>(url, {});
    }

    public search(model: SearchFilesRequest) {
        return this._httpClient.post<GetListResult<PrivateFileNameModel>>(`${this._baseControllerUrl}/query/search`, model);
    }
}
