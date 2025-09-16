import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  SubjectCountsModel,
  SubjectModel,
  SubjectWithClarificationsModel
} from '../models/subject.models';

/**
 * Методы контроллера Tutor.Api.Controllers.Subjects.SubjectQueryController
 * 
 * Базовый урл = api/tutor/subject/query
 * 
 * Методы для получения предметов
 */
@Injectable({
  providedIn: 'root',
})
export class SubjectQueryService {
  private readonly _baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._baseControllerUrl = `${baseUrl}api/tutor/subject/query`;
  }

  public getAll() {
    return this._httpClient.get<SubjectModel[]>(`${this._baseControllerUrl}/get-all`);
  }

  public getAllCached() {
    return this._httpClient.get<SubjectModel[]>(`${this._baseControllerUrl}/get-all/cached`);
  }

  public getAllWithClarifications() {
    return this._httpClient.get<SubjectWithClarificationsModel[]>(`${this._baseControllerUrl}/get-all/with-clarifications`);
  }

  public getAllWithClarificationsCached() {
    return this._httpClient.get<SubjectWithClarificationsModel[]>(`${this._baseControllerUrl}/get-all/with-clarifications/cached`);
  }

  public getByAliasOrId(id: string) {
    return this._httpClient.get<SubjectCountsModel>(`${this._baseControllerUrl}/GetByAliasOrId?idOrAlias=${id}`);
  }

  public getByAliasOrIdCached(idOrAlias: string) {
    return this._httpClient.get<SubjectCountsModel>(`${this._baseControllerUrl}/GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }
}

