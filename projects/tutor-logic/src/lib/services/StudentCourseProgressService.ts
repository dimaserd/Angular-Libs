import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApiResponse } from '../models';
import { FinishStudentCourseThemeProgressRequest, StartCourseThemeItemTestRequest, StartCourseThemeItemTestResult, StartCourseThemeRequest, UpdateStudentCourseThemeProgressRequest, UpdateStudentCourseThemeProgressResult } from '../models/student-course-models';

/**
 * Сервис для прохождения курса студентом
 */
@Injectable({
  providedIn: 'root',
})
export class StudentCourseProgressService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = `${baseUrl}api/tutor/student-course-progress`;
  }

  startTheme(model: StartCourseThemeRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/theme/start`, model);
  }

  updateThemeProgress(model: UpdateStudentCourseThemeProgressRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/theme/update`, model);
  }

  updateThemeProgressV2(model: UpdateStudentCourseThemeProgressRequest) {
    return this._httpClient.post<UpdateStudentCourseThemeProgressResult>(`${this.baseControllerUrl}/theme/update/v2`, model);
  }

  finishTheme(model: FinishStudentCourseThemeProgressRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/theme/finish`, model);
  }

  finishThemeV2(model: FinishStudentCourseThemeProgressRequest) {
    return this._httpClient.post<UpdateStudentCourseThemeProgressResult>(`${this.baseControllerUrl}/theme/finish/v2`, model);
  }

  startTestForItemBlock(model: StartCourseThemeItemTestRequest) {
    return this._httpClient.post<StartCourseThemeItemTestResult>(`${this.baseControllerUrl}/theme/item/start-test`, model);
  }
}

