import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { BaseApiResponse } from "croco-generic-app-logic";
import { CreateSubjectMenuRequest, SubjectMenuSimpleModel } from "../models";

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

  public create(model: CreateSubjectMenuRequest) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/create`, model);
  }

  public getMain() {
    return this._httpClient.get<SubjectMenuSimpleModel>(`${this.baseControllerUrl}/query/main`);
  }
}