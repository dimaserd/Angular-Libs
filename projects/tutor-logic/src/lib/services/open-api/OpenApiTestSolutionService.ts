import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OpenApiExtensions, OpenApiUrlProvider } from "../../extensions";
import { StudentTestSolutionModel } from "../../models";

@Injectable({
    providedIn: 'root',
})
export class OpenApiTestSolutionService {
    
    getBaseUrl(){
        return OpenApiExtensions.buildOpenApiUrl(this._urlProvider, 'api/tutor/open-api/test-soluton/');
    }

    constructor(private _httpClient: HttpClient,
        private _urlProvider: OpenApiUrlProvider) {
    }

    public getById(id: string) {
        return this._httpClient.get<StudentTestSolutionModel>(this.getBaseUrl() + id);
    }
}
