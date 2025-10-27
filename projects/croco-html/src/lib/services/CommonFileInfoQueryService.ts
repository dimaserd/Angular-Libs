import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { CommonFileInfoResultModel } from "./file-models";

@Injectable({
    providedIn: 'root'
})
export class CommonFileInfoQueryService {

    private readonly _baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this._baseControllerUrl = `${baseUrl}api/common-files`;
    }

    /**
     * Получить информацию о файле на сервере по идентификатору.
     * @param model 
     * @returns 
     */
    public getInfo(id: string) {
        return this._httpClient.get<CommonFileInfoResultModel>(
            `${this._baseControllerUrl}/query/get-info/${id}`
        );
    }
}