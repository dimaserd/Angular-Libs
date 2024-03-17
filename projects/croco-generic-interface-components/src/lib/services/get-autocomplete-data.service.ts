import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import {AutoCompleteSuggestion} from "../models/AutoCompleteSuggestion";

@Injectable()
export class GetAutocompleteDataService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  getData(query: string, type: string): Observable<AutoCompleteSuggestion[]> {
    const params: HttpParams = new HttpParams().set('providerTypeFullName', type).set('query', query);
    return this.httpClient.get<AutoCompleteSuggestion[]>(
      `${this.baseUrl}Documentation/GenericInterface/CallDataProvider`,
      { params: params },
    );
  }
}
