import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ChangeSubjectConfiguration } from '../models/subject.models';
import { BaseApiResponse } from '../models';
import { CreateSubjectMenuRequest, SubjectMenu, SubjectMenuSimpleModel } from '../models/subject-menu-models';

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

  public getByAliasOrId(idOrAlias: string) {
    return this._httpClient.get<SubjectMenu>(`${this.baseControllerUrl}/GetByAliasOrId?idOrAlias=${idOrAlias}`);
  }

  public getByAliasOrIdCached(idOrAlias: string) {
    return this._httpClient.get<SubjectMenu>(`${this.baseControllerUrl}/GetByAliasOrId/Cached?idOrAlias=${idOrAlias}`);
  }

  public update(model: ChangeSubjectConfiguration) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/Update`, model);
  }

  public create(model: CreateSubjectMenuRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/create`, model);
  }

  public getMain() {
    return this._httpClient.get<SubjectMenuSimpleModel>(`${this.baseControllerUrl}/query/main`);
  }
}
