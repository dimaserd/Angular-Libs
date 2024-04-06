import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectForStudentDetailedViewModel, SubjectModel } from '../models/subject.models';

/**
 * Методы контроллера Tutor.Api.Controllers.Subjects.StudentSubjectViewController
 *
 * Базовый урл = api/tutor/student-subject-view
 *
 * Методы для построения меню предмета
 */

@Injectable({
  providedIn: 'root',
})
export class StudentSubjectViewService {
  baseControllerUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/student-subject-view/';
  }

  public getV1(idOrAlias: string, iconSetId: string): Observable<SubjectForStudentDetailedViewModel> {
    return this._httpClient.get<SubjectForStudentDetailedViewModel>(this.baseControllerUrl + `get/v1?idOrAlias=${idOrAlias}&iconSetId=${iconSetId}`);
  }
}
