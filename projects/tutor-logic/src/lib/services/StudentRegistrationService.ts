import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { RegisterModel, RegisterStudentRequest, StudentRegistrationResult } from "../models/student-models";

@Injectable({ providedIn: 'root' })
export class StudentRegistrationService {
    private readonly _baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseControllerUrl = baseUrl + 'api/tutor/student';
    }

    register(model: RegisterModel) {
        return this._httpClient.post<StudentRegistrationResult>(`${this._baseControllerUrl}/register`, model);
    }

    registerV2(model: RegisterStudentRequest) {
        return this._httpClient.post<StudentRegistrationResult>(`${this._baseControllerUrl}/register/v2`, model);
    }

    demoRegistration() {
        return this._httpClient.post<StudentRegistrationResult>(`${this._baseControllerUrl}/register/demo`, {});
    }
}
