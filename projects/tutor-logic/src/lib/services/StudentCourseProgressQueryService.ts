import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { SearchCourseProgressesRequest, StudentCourseProgressModel, StudentCourseProgressWithStudentModel } from '../models/student-course-models';
import { GetListResult } from "../models";

@Injectable({
  providedIn: 'root',
})
export class StudentCourseProgressQueryService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = `${baseUrl}api/tutor/student-course-progress/query`;
  }

  /**
   * Получить прогресс студента по курсу
   * @param courseId Идентификатор курса
   * @returns 
   */
  getMine(courseId: string) {
    return this._httpClient.get<StudentCourseProgressModel>(`${this.baseControllerUrl}/mine/${courseId}`);
  }

  search(model: SearchCourseProgressesRequest) {
    return this._httpClient.post<GetListResult<StudentCourseProgressWithStudentModel>>(
      `${this.baseControllerUrl}/search`,
      model
    );
  }
}
