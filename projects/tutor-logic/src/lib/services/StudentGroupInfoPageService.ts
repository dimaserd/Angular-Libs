import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { GetStudentGroupInfoPageRequest, StudentGroupInfoPageDetailedModel } from "../models/group-page-info-models";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentGroupInfoPageService {
    baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student-group/info-page';
    }

    get(model: GetStudentGroupInfoPageRequest): Observable<StudentGroupInfoPageDetailedModel> {
        return this._httpClient.post<StudentGroupInfoPageDetailedModel>(
            `${this.baseControllerUrl}/get`,
            model
        );
    }
}
