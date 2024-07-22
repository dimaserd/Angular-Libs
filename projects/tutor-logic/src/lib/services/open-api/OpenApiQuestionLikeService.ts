import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { GetListResult, SearchQuestionsByLikes, TestQuestionModel } from "../../models";

@Injectable({
    providedIn: 'root',
})
export class OpenApiQuestionLikeService {
    
    private readonly _baseUrl: string = "";

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
    ) {
        this._baseUrl = `${baseUrl}api/tutor/open-api/question-like`;
    }

    public search(model: SearchQuestionsByLikes) {
        return this._httpClient.post<GetListResult<TestQuestionModel>>(`${this._baseUrl}/search`, model);
    }
}
