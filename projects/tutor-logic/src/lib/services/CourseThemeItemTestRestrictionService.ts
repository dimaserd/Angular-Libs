import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { BaseApiResponse, GetListResult } from "../models";
import { CourseItemGlobalTestRestrictionModel, TestRestrictionModel, CourseItemStudentTestRestrictionModel, GetCourseThemeItemStudentTestRestrictionRequest, TestRestrictionValidationResult, TestRestrictionValidationWithDeadLineWarningResult, SearchStudentThemeItemTestRestrictionsRequest, ThemeItemTestStudentRestrictionModel } from "../models/test-restriction-models";

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
export class CourseThemeItemTestRestrictionService {
    private baseControllerUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-theme-item/test-restriction/';
    }

    setGlobal(model: CourseItemGlobalTestRestrictionModel) {
        return this.http.post<BaseApiResponse>(this.baseControllerUrl + 'global', model);
    }

    getGlobal(id: string) {
        return this.http.get<TestRestrictionModel>(this.baseControllerUrl + `global/${id}`);
    }

    updateForStudent(model: CourseItemStudentTestRestrictionModel) {
        return this.http.post<BaseApiResponse>(this.baseControllerUrl + `student/update`, model);
    }

    getStudentRestriction(model: GetCourseThemeItemStudentTestRestrictionRequest) {
        return this.http.post<TestRestrictionValidationResult>(this.baseControllerUrl + `student/query/get-validated-item-restriction`, model);
    }

    getStudentRestrictionWithDeadLineWarning(model: GetCourseThemeItemStudentTestRestrictionRequest) {
        return this.http.post<TestRestrictionValidationWithDeadLineWarningResult>(this.baseControllerUrl + `student/query/get-validated-item-restriction-with-deadline-warning`, model);
    }

    searchStudents(model: SearchStudentThemeItemTestRestrictionsRequest) {
        return this.http.post<GetListResult<ThemeItemTestStudentRestrictionModel>>(this.baseControllerUrl + 'student/query/search', model);
    }
}