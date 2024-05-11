import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { CourseOrderModel, CreateCourseOrderRequest, CreateCourseOrderResponse } from "../models/course-shop-models";

/**
 * Предоставляем методы контроллера Tutor.Api.Controllers.Courses.CourseOrderController
 */
@Injectable({
    providedIn: 'root',
})
export class CourseOrderService {
    baseControllerUrl: string;

    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-order';
    }

    /**
     * Получить заказ на покупку курса по идентификатору
     * @param id идентификатор заказа
     * @returns 
     */
    getById(id: string) {
        return this._httpClient.get<CourseOrderModel>(`${this.baseControllerUrl}/query/get-by-id/${id}`);
    }

    /**
     * созать заказ на покупку курса
     * @param model запрос для создания заказа на покупку курса
     * @returns 
     */
    create(model: CreateCourseOrderRequest) {
        return this._httpClient.post<CreateCourseOrderResponse>(`${this.baseControllerUrl}/create`, model);
    }
}
