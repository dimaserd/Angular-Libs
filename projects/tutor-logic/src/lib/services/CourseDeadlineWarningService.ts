import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { GetStudentCourseThemeItemsDeadlineWarningsRequest, CourseThemeItemStudentDeadlineWarningModel, CourseThemeIdWithDeadlineWarnings } from "../models/test-restriction-models";

/**
 * Методы контроллера Tutor.Api.Controllers.Courses.CourseThemeItemStudentTestRestrictionController
 * 
 * Предоставляет методы для работы с предупреждениями о наступающем дедлайне в курсе
 * 
 * базовый путь = api/tutor/course-theme-item/test-restriction/student
 */
@Injectable({
    providedIn: 'root',
})
export class CourseDeadlineWarningService {
    baseControllerUrl: string;

    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-deadline-warning/';
    }

    getStudentWarnings(model: GetStudentCourseThemeItemsDeadlineWarningsRequest) {
        return this._httpClient.post<CourseThemeItemStudentDeadlineWarningModel[]>(this.baseControllerUrl + `query/for-student/all`, model);
    }

    getStudentWarningsGrouped(model: GetStudentCourseThemeItemsDeadlineWarningsRequest) {
        return this._httpClient.post<CourseThemeIdWithDeadlineWarnings[]>(this.baseControllerUrl + `query/for-student/grouped`, model);
    }
}
