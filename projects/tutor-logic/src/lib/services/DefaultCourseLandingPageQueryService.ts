import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { DefaultCourseLandingPageModel } from "../models/default-course-landing-page-models";

@Injectable({
    providedIn: 'root',
})
export class DefaultCourseLandingPageQueryService {
    private readonly _baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseControllerUrl = `${baseUrl}api/tutor/default-course-landing-page/query`;
    }

    getById(id: string) {
        return this._httpClient.get<DefaultCourseLandingPageModel>(`${this._baseControllerUrl}/get-by-id/${id}`);
    }
}
