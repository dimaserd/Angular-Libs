import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { CreateLoginLinkFromAuthenticationRequest, CreateLoginLinkResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginLinkService {

  private readonly _baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._baseControllerUrl = baseUrl + 'api/account/Link/'
  }

  createFromAuthentication(model: CreateLoginLinkFromAuthenticationRequest) {
    return this._httpClient.post<CreateLoginLinkResult>(this._baseControllerUrl + 'Create/FromAuthentication', model);
  }
}
