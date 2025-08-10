import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SubjectCountsModel,
  SubjectModel,
  SubjectWithIconModel
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

  public getAll(): Observable<SubjectModel[]> {
    return this._httpClient.get<SubjectModel[]>(`${this._baseControllerUrl}/GetAll`);
  }

  public getAllCached(): Observable<SubjectModel[]> {
    return this._httpClient.get<SubjectModel[]>(`${this._baseControllerUrl}/GetAll/Cached`);
  }

  public getAllWithIconsCached(iconSetId: string): Observable<SubjectWithIconModel[]> {
    return this._httpClient.get<SubjectWithIconModel[]>(`${this._baseControllerUrl}/GetAll/with-icons/Cached?iconSetId=${iconSetId}`);
  }

  public getByAliasOrId(id: string): Observable<SubjectCountsModel> {
    return this._httpClient.get<SubjectCountsModel>(`${this._baseControllerUrl}/GetByAliasOrId?idOrAlias=${id}`);
  }

  public getByAliasOrIdCached(idOrAlias: string): Observable<SubjectCountsModel> {
    return this._httpClient.get<SubjectCountsModel>(`${this._baseControllerUrl}/GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }
}

