import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { AddCoursePaymentRequest, AddCoursePaymentResult, SetPaymentSystemForCoursePayment } from "../models/course-payment-models";
import { BaseApiResponse } from "../models";

@Injectable({
    providedIn: 'root',
})
export class CoursePaymentService {
    baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = `${baseUrl}api/tutor/student-course/payments`;
    }

    add(model: AddCoursePaymentRequest) {
        return this._httpClient.post<AddCoursePaymentResult>(`${this.baseControllerUrl}/add`, model);
    }

    setPaymentSystem(model: SetPaymentSystemForCoursePayment) {
        return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/set-payment-system`, model);
    }
}


