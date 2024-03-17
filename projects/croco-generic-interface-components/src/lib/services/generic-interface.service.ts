import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GenerateGenericUserInterfaceModel} from "../models/GenerateGenericUserInterfaceModel";

@Injectable()
export class GenericInterfaceService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  public getInterfaceByName(typeDisplayFullName: string): Observable<GenerateGenericUserInterfaceModel> {
    return this.httpClient.post<GenerateGenericUserInterfaceModel>(
      this.baseUrl + `Documentation/GenericInterface?typeName=${typeDisplayFullName}`,
      {},
    );
  }
}
