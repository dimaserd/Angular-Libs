import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CourseLandingPageDataModel, SearchCourseLandingPageRequest } from '../models';

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
    this._baseUrl = baseUrl + 'api/tutor/course-landing-page/query/';
  }

  /**
   * Поиск лендинг страниц
   * @param model 
   * @returns 
   */
  search(model: SearchCourseLandingPageRequest) {
    return this._httpClient.post<CourseLandingPageDataModel>(`${this._baseUrl}search`, model);
  }

  /**
   * Получить лендинг страницу по идентификатору
   * @param id 
   * @returns 
   */
  getById(id: string) {

    let params: HttpParams = new HttpParams();
    params.set('id', id);

    return this._httpClient.get<CourseLandingPageDataModel>(`${this._baseUrl}get-by-id`, { params: params });
  }

  getByIdCached(id: string) {

    let params: HttpParams = new HttpParams();
    params.set('id', id);

    return this._httpClient.get<CourseLandingPageDataModel>(`${this._baseUrl}get-by-id/cached`, { params: params });
  }
}
