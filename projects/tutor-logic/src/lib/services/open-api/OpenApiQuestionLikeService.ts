import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OpenApiExtensions, OpenApiUrlProvider } from "../../extensions";
import { GetListResult, SearchQuestionsByLikes, TestQuestionModel } from "../../models";

@Injectable({
    providedIn: 'root',
})
export class OpenApiQuestionLikeService {
    
    getBaseUrl(){
        return OpenApiExtensions.buildOpenApiUrl(this._urlProvider, 'api/tutor/open-api/question-like/');
    }

    constructor(private _httpClient: HttpClient,
        private _urlProvider: OpenApiUrlProvider) {
    }

    public search(model: SearchQuestionsByLikes) {
        return this._httpClient.post<GetListResult<TestQuestionModel>>(this.getBaseUrl() + 'search', model);
    }
}
