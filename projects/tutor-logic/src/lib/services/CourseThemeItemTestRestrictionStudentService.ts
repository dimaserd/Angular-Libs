import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { BaseApiResponse, GetListResult } from "../models";
import { CourseItemStudentTestRestrictionModel, GetCourseThemeItemStudentTestRestrictionRequest, TestRestrictionValidationResult, TestRestrictionValidationWithDeadLineWarningResult, SearchStudentThemeItemTestRestrictionsRequest, ThemeItemTestStudentRestrictionModel } from "../models/test-restriction-models";

/**
 * Методы контроллера Tutor.Api.Controllers.Courses.CourseThemeItemStudentTestRestrictionController
 *
 * Предоставляет методы для управления ограничениями теста для блока курса
 *
 * базовый путь = api/tutor/course-theme-item/test-restriction/student
 */

@Injectable({
    providedIn: 'root',
})
export class CourseThemeItemTestRestrictionStudentService {
    private baseControllerUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-theme-item/test-restriction/student/';
    }

    updateForStudent(model: CourseItemStudentTestRestrictionModel) {
        return this.http.post<BaseApiResponse>(this.baseControllerUrl + `update`, model);
    }

    getStudentRestriction(model: GetCourseThemeItemStudentTestRestrictionRequest) {
        return this.http.post<TestRestrictionValidationResult>(this.baseControllerUrl + `query/get-validated-item-restriction`, model);
    }

    getStudentRestrictionWithDeadLineWarning(model: GetCourseThemeItemStudentTestRestrictionRequest) {
        return this.http.post<TestRestrictionValidationWithDeadLineWarningResult>(this.baseControllerUrl + `query/get-validated-item-restriction-with-deadline-warning`, model);
    }

    searchStudents(model: SearchStudentThemeItemTestRestrictionsRequest) {
        return this.http.post<GetListResult<ThemeItemTestStudentRestrictionModel>>(this.baseControllerUrl + 'query/search', model);
    }
}
