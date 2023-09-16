import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OpenApiServerOptions } from "../models";

@Injectable({
  providedIn: 'root',
})
export class OpenApiUrlProvider {

  _urlValue: string = "";
  _data: OpenApiServerOptions = {
    useOpenApiServer: false,
    openApiUrl: ""
  }

  constructor(private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this._urlValue = baseUrl;
    this.getSettings(baseUrl);
  }

  getSettings(baseUrl: string) {
    this._httpClient.get<OpenApiServerOptions>(baseUrl + "api/settings/open-api/get").subscribe(data => {
      if(data.useOpenApiServer && data.openApiUrl){
        this._data = data;
        this._urlValue = data.openApiUrl;
      }
    });
  }

  getData() {
    return this._data;
  }

  getUrl(): string {
    return this._urlValue;
  }
}
