import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseThemeSolutionsWithTestRestrictionsViewModel } from "../models";

/**
 * Предоставляет методы контроллера Tutor.Api.Controllers.Courses.StudentCourseViewController
 * Оптимизированные методы для работы студентов с курсами
 * Базовый урл = api/tutor/student-course-view
 */
@Injectable({
    providedIn: 'root',
})
export class StudentCourseViewService {
    baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/student-course-view/';
    }

    /**
     * 
     * @param studentProgressId Запрос для получения решений тестов по блоку в теме курса и ограничения по количеству попыток и дедлайну. Метод кешируется на 30 секунд. 
     * @param themeItemId 
     * @returns 
     */
    public loadThemeSolutionsAndTestRestriction(studentProgressId: string, themeItemId: string): Observable<CourseThemeSolutionsWithTestRestrictionsViewModel> {
        return this._httpClient.get<CourseThemeSolutionsWithTestRestrictionsViewModel>(this.baseControllerUrl + `load-theme-solutions-and-restriction?studentProgressId=${studentProgressId}&themeItemId=${themeItemId}`);
    }
}
