import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { StudentTestGroupRelationDetailedModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class StudentGroupTestRelationQueryService {

    getBaseUrl() {
        return `${this._baseUrl}api/tutor/student-group/tests`;
    }

    private readonly _baseUrl: string = "";

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
    ) {
        this._baseUrl = baseUrl;
    }

    getById(studentGroupId: string, testId: string) {
        return this._httpClient.get<StudentTestGroupRelationDetailedModel>(`${this.getBaseUrl()}/getById/${testId}/${studentGroupId}`);
    }
}
