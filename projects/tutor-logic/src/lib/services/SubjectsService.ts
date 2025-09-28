import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateSubjectRequest,
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
  private readonly baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/subject';
  }

  public create(model: CreateSubjectRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/create`, model);
  }

  public order(model: OrderSubjectsRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/order`, model);
  }

  public update(model: UpdateSubjectRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/update`, model);
  }
}
