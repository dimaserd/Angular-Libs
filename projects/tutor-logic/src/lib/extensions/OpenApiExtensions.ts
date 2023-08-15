import { OpenApiUrlProvider } from "./OpenApiUrlProvider";

export class OpenApiExtensions {
  static buildOpenApiUrl(urlProvider: OpenApiUrlProvider, adding: string): string {
    return urlProvider.getUrl() + adding;
  }
}
