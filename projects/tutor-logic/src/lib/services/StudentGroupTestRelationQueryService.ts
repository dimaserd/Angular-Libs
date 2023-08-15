import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OpenApiExtensions, OpenApiUrlProvider } from "../extensions";
import { StudentTestGroupRelationDetailedModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class StudentGroupTestRelationQueryService {

    getBaseUrl() {
        return OpenApiExtensions.buildOpenApiUrl(this._baseUrlProvider, 'api/tutor/student-group/tests/');
    }

    constructor(private _httpClient: HttpClient,
        private _baseUrlProvider: OpenApiUrlProvider) {
    }

    getById(studentGroupId: string, testId: string) {
        return this._httpClient.get<StudentTestGroupRelationDetailedModel>(this.getBaseUrl() + `getById/${testId}/${studentGroupId}`);
    }
}
