import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OpenApiServerOptions } from "../models";

@Injectable({
  providedIn: 'root',
})
export class OpenApiUrlProvider {

  _urlValue: string = "";

  constructor(private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this._urlValue = baseUrl;
    this.getSettings();
  }

  getSettings() {
    this._httpClient.get<OpenApiServerOptions>(this._urlValue + "api/settings/open-api/get").subscribe(data => {
      if(data.useOpenApiServer && data.openApiUrl){
        this._urlValue = data.openApiUrl;
      }
    });
  }

  getUrl(): string {
    return this._urlValue;
  }
}
