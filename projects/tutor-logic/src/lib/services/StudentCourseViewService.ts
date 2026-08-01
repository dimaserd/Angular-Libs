import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseThemeItemsTestSolutionsRestrictionsModel } from "../models";

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
        this.baseControllerUrl = `${baseUrl}api/tutor/student-course-view`;
    }

    /**
     * Запрос для получения решений тестов по блоку в теме курса и ограничения по количеству попыток и дедлайну. Метод кешируется на 30 секунд. 
     * @param courseId - идентификатор курса
     * @param studentProgressId - идентификатор прогресса ученика
     * @param themeItemId - идентификатор блока тема внутри курса
     * @param solutionsCount - количество решений тестов
     * @returns 
     */
    public loadThemeItemSolutionsAndTestRestriction(courseId: string, studentProgressId: string, themeItemId: string, solutionsCount: number): Observable<CourseThemeItemsTestSolutionsRestrictionsModel[]> {

        const paramsStr = `courseId=${courseId}&studentProgressId=${studentProgressId}&themeItemId=${themeItemId}&solutionsCount=${solutionsCount}`;``

        return this._httpClient.get<CourseThemeItemsTestSolutionsRestrictionsModel[]>(`${this.baseControllerUrl}/load-theme-solutions-and-restriction?${paramsStr}`);
    }
}
