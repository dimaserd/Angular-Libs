import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { EnumValueTypeWithDescriptionStudentCoursePaymentType, SearchStudentCoursePaymentsRequest, StudentCoursePaymentDetailedModel, StudentCoursePaymentModel } from "../models/course-payment-models";
import { GetListResult } from "../models";

@Injectable({
    providedIn: 'root',
})
export class CoursePaymentQueryService {
    baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student-course/payments/query';
    }

    getById(id: string) {
        return this._httpClient.get<StudentCoursePaymentModel>(`${this.baseControllerUrl}/byId/${id}`);
    }

    getByPaymentId(id: string) {
        return this._httpClient.get<StudentCoursePaymentModel>(`${this.baseControllerUrl}/by/pmt-id/${id}`);
    }

    search(model: SearchStudentCoursePaymentsRequest) {
        return this._httpClient.post<GetListResult<StudentCoursePaymentModel>>(`${this.baseControllerUrl}/search`, model);
    }

    searchDetailed(model: SearchStudentCoursePaymentsRequest) {
        return this._httpClient.post<GetListResult<StudentCoursePaymentDetailedModel>>(
            `${this.baseControllerUrl}/search-detailed`,
            model
        );
    }

    getTypes() {
        return this._httpClient.get<EnumValueTypeWithDescriptionStudentCoursePaymentType[]>(this.baseControllerUrl + 'Types');
    }
}
