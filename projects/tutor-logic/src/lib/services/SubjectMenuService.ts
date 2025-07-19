import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeSubjectConfiguration } from '../models/subject.models';
import { BaseApiResponse } from '../models';
import { SubjectMenu } from '../models/subject-menu-models';

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
  private readonly baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = `${baseUrl}api/tutor/subject/menu`;
  }

  public getByAliasOrId(idOrAlias: string): Observable<SubjectMenu> {
    return this._httpClient.get<SubjectMenu>(`${this.baseControllerUrl}/GetByAliasOrId?idOrAlias=${idOrAlias}`);
  }

  public getByAliasOrIdCached(idOrAlias: string): Observable<SubjectMenu> {
    return this._httpClient.get<SubjectMenu>(`${this.baseControllerUrl}/GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }

  public update(model: ChangeSubjectConfiguration): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/Update`, model);
  }

  public getMain() {
    return this._httpClient.get<BaseApiResponse>(`${this.baseControllerUrl}/query/main`);
  }
}
