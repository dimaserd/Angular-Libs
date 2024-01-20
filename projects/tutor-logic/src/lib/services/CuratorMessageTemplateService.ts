import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse, GetListResult } from '../models';
import { CreateOrUpdateCuratorMessageTemplate, DeleteCuratorMessageTemplate, SearchCuratorMessageTemplates, CuratorMessageTemplateModel } from '../models/curator-models';


@Injectable({
  providedIn: 'root',
})
export class CuratorMessageTemplateService {
  getBaseControllerUrl() {
    return this._baseUrl + 'api/tutor/curator/message-template/';
  }

  private readonly _baseUrl: string = "";

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this._baseUrl = baseUrl;
  }

  public createOrUpdate(model: CreateOrUpdateCuratorMessageTemplate): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.getBaseControllerUrl() + 'create-or-update', model);
  }

  public delete(model: DeleteCuratorMessageTemplate): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.getBaseControllerUrl() + 'delete', model);
  }

  public search(model: SearchCuratorMessageTemplates): Observable<GetListResult<CuratorMessageTemplateModel>> {
    return this._httpClient.post<GetListResult<CuratorMessageTemplateModel>>(
      this.getBaseControllerUrl() + 'search',
      model,
    );
  }
}
