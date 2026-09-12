import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseModulePageTestSolutionRestrictionsModel } from "../models";

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
     * Запрос для получения решений тестов по странице модуля курса и ограничения по количеству попыток и дедлайну. Метод кешируется на 30 секунд. 
     * @param courseId - идентификатор курса
     * @param studentProgressId - идентификатор прогресса ученика
     * @param modulePageId - идентификатор страницы модуля внутри курса
     * @param solutionsCount - количество решений тестов
     * @param key - ключ для сброса кеширования
     * @returns 
     */
    public loadModulePageSolutionsAndTestRestriction(courseId: string, studentProgressId: string, modulePageId: string, solutionsCount: number, key: string): Observable<CourseModulePageTestSolutionRestrictionsModel[]> {

        const paramsStr = `courseId=${courseId}&studentProgressId=${studentProgressId}&modulePageId=${modulePageId}&solutionsCount=${solutionsCount}&key=${key}`;``

        return this._httpClient.get<CourseModulePageTestSolutionRestrictionsModel[]>(`${this.baseControllerUrl}/load-module-page-solutions-and-restriction?${paramsStr}`);
    }
}
