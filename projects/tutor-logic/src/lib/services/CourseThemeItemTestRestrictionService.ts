import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { BaseApiResponse } from "../models";
import { CourseItemGlobalTestRestrictionModel, TestRestrictionModel } from "../models/test-restriction-models";

/**
 * Методы контроллера Tutor.Api.Controllers.Courses.CourseThemeItemTestRestrictionController
 * 
 * Предоставляет методы для управления глобальными ограничениями теста для блока курса
 * 
 * базовый путь = api/tutor/course-theme-item/test-restriction
 */
@Injectable({
    providedIn: 'root',
})
export class CourseThemeItemTestRestrictionService {
    private baseControllerUrl: string;

    constructor(
        private readonly _http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-theme-item/test-restriction/';
    }

    setGlobal(model: CourseItemGlobalTestRestrictionModel) {
        return this._http.post<BaseApiResponse>(this.baseControllerUrl + 'global', model);
    }

    getGlobal(id: string) {
        return this._http.get<TestRestrictionModel>(this.baseControllerUrl + `global/${id}`);
    }

    removeAll(courseId: string) {
        return this._http.post<BaseApiResponse>(this.baseControllerUrl + `remove-all/${courseId}`, {});
    }
}