import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResult, SearchTestsRequest, TestDetailedModel, TestSimpleModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TestQueryService {

  private readonly _baseUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._baseUrl = `${baseUrl}api/tutor/test/query`
  }

  public search(searchModel: SearchTestsRequest): Observable<GetListResult<TestSimpleModel>> {
    return this._httpClient.post<GetListResult<TestSimpleModel>>(`${this._baseUrl}/search`, searchModel);
  }

  public getDetailedById(id: string): Observable<TestDetailedModel> {
    return this._httpClient.get<TestDetailedModel>(`${this._baseUrl}/get-by-id/${id}/detailed`);
  }

  public getSimpleById(id: string): Observable<TestSimpleModel> {
    return this._httpClient.get<TestSimpleModel>(`${this._baseUrl}/get-by-id/${id}/simple`);
  }
}
