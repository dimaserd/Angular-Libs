import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateSubject,
  OrderSubjectsRequest,
  UpdateSubjectRequest,
} from '../models/subject.models';
import { BaseApiResponse } from '../models';

/**
 * Методы контроллера Tutor.Api.Controllers.Subjects.SubjectController
 * 
 * Базовый урл = api/tutor/subject
 * 
 * Методы для работы с предметами
 */
@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  baseControllerUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/subject/';
  }

  public create(model: CreateSubject): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'Create', model);
  }

  public order(model: OrderSubjectsRequest): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'order', model);
  }

  public update(model: UpdateSubjectRequest) : Observable<BaseApiResponse>{
    return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'Update', model);
  }
}
