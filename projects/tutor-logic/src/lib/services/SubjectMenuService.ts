import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeSubjectConfiguration, SubjectMenu } from '../models/subject.models';
import { BaseApiResponse } from '../models';

/**
 * Методы контроллера Tutor.Api.Controllers.Subjects.SubjectMenuController
 * 
 * Базовый урл = api/tutor/subject/menu
 * 
 * Методы для работы с меню предмета
 */
@Injectable({
  providedIn: 'root',
})
export class SubjectMenuService {
  baseControllerUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/subject/menu/';
  }

  public getByAliasOrId(idOrAlias: string): Observable<SubjectMenu> {
    return this._httpClient.get<SubjectMenu>(this.baseControllerUrl + `GetByAliasOrId?idOrAlias=${idOrAlias}`);
  }

  public getByAliasOrIdCached(idOrAlias: string): Observable<SubjectMenu> {
    return this._httpClient.get<SubjectMenu>(this.baseControllerUrl + `GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }

  public update(model: ChangeSubjectConfiguration): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + `Update`, model);
  }
}
