import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CourseLandingPageDetailedModel, CourseLandingPageSimpleModel, GetListResult, SearchCourseLandingPageRequest } from '../models';

/**
 * Предоставляет методы для работы с лендинг страницами для курса
 * Контроллер = Tutor.Api.Controllers.Landings.CourseLandingPageController
 */
@Injectable({
  providedIn: 'root',
})
export class CourseLandingPageQueryService {

  private readonly _baseUrl: string = "";

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._baseUrl = baseUrl + 'api/tutor/course-landing-page/query';
  }

  /**
   * Поиск лендинг страниц
   * @param model 
   * @returns 
   */
  search(model: SearchCourseLandingPageRequest) {
    return this._httpClient.post<GetListResult<CourseLandingPageSimpleModel>>(`${this._baseUrl}/search`, model);
  }

  /**
   * Получить лендинг страницу по идентификатору
   * @param id идентификатор страницы
   * @param useCache использовать кеш
   * @returns 
   */
  getById(id: string, useCache: boolean) {
    if (useCache) {
      return this.getByIdCached(id);
    }

    return this._httpClient.get<CourseLandingPageDetailedModel>(`${this._baseUrl}/get-by-id?id=${id}`);
  }

  private getByIdCached(id: string) {
    return this._httpClient.get<CourseLandingPageDetailedModel>(`${this._baseUrl}/get-by-id/cached?id=${id}`);
  }
}
