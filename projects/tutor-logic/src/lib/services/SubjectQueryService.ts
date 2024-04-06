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
  baseControllerUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/subject/query/';
  }

  public getAll(): Observable<SubjectModel[]> {
    return this._httpClient.get<SubjectModel[]>(this.baseControllerUrl + `GetAll`);
  }

  public getAllCached(): Observable<SubjectModel[]> {
    return this._httpClient.get<SubjectModel[]>(this.baseControllerUrl + `GetAll/Cached`);
  }

  public getAllWithIconsCached(iconSetId: string): Observable<SubjectWithIconModel[]> {
    return this._httpClient.get<SubjectWithIconModel[]>(this.baseControllerUrl + `GetAll/with-icons/Cached?iconSetId=${iconSetId}`);
  }

  public getByAliasOrId(id: string): Observable<SubjectCountsModel> {
    return this._httpClient.get<SubjectCountsModel>(this.baseControllerUrl + `GetByAliasOrId?aliasOrId=${id}`);
  }

  public getByAliasOrIdCached(idOrAlias: string): Observable<SubjectCountsModel> {
    return this._httpClient.get<SubjectCountsModel>(this.baseControllerUrl + `GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }
}

