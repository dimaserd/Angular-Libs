import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, ClientModel, EditClient } from "../models";

@Injectable({ providedIn: 'root' })
export class ClientService {

  private readonly _baseClientUrl: string;
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') readonly _baseUrl: string
  ) {
    this._baseClientUrl = _baseUrl + 'api/client';
  }

  public getClientData(): Observable<ClientModel> {
    return this._httpClient.get<ClientModel>(`${this._baseClientUrl}/getdata`
    );
  }

  public editClientData(model: EditClient): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(`${this._baseClientUrl}/edit`, model);
  }

  public updatePhoto(fileId: number): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(`${this._baseClientUrl}/Avatar/Update?fileId=${fileId}`, {});
  }

  public deletePhoto(): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(`${this._baseClientUrl}/Avatar/Delete`, {});
  }
}
