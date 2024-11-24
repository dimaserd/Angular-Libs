import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { GetStudentGroupCourseAccessRequest, StudentGroupCourseWithDetailedAccessModel } from "../models/group-access-models";

@Injectable({ providedIn: 'root' })
export class StudentGroupCourseAccessService {
    baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student-group-access';
    }

    get(model: GetStudentGroupCourseAccessRequest) {
        return this._httpClient.post<StudentGroupCourseWithDetailedAccessModel>(`${this.baseControllerUrl}/get`, model);
    }
}
