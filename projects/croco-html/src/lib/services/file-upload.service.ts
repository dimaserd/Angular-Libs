import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BaseApiResponse {
  isSucceeded: boolean;
  message: string;
}

export interface GenericBaseApiResponse<T> extends BaseApiResponse {
  responseObject: T;
}

export interface BaseApiResponseWithFilesIds extends BaseApiResponse {
  responseObject: number[];
}

export interface UploadFileWithProgressEvent {
  loading: boolean;
  response?: BaseApiResponseWithFilesIds;
  uploadingLoaded: number;
  uploadingTotal: number;
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  public postFiles(files: FileList, createLocalCopiesNow = false): Observable<BaseApiResponseWithFilesIds> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      var fileToUpload = files.item(i);
      formData.append(`fileKey${i}`, fileToUpload as Blob, fileToUpload?.name);
    }

    return this.postFilesInner(formData, createLocalCopiesNow);
  }

  public postFilesInner(
    formData: FormData,
    createLocalCopiesNow: boolean,
    withProgress: true,
  ): Observable<HttpEvent<BaseApiResponseWithFilesIds>>;

  public postFilesInner(
    formData: FormData,
    createLocalCopiesNow?: boolean,
    withProgress?: false,
  ): Observable<BaseApiResponseWithFilesIds>;
  public postFilesInner(
    formData: FormData,
    createLocalCopiesNow: boolean,
    withProgress: boolean,
  ): Observable<BaseApiResponseWithFilesIds> | Observable<HttpEvent<BaseApiResponseWithFilesIds>>;
  public postFilesInner(
    formData: FormData,
    createLocalCopiesNow = false,
    withProgress = false,
  ): Observable<BaseApiResponseWithFilesIds> | Observable<HttpEvent<BaseApiResponseWithFilesIds>> {
    let endpoint = createLocalCopiesNow
      ? this.baseUrl + 'api/files/upload/now/with-handlers'
      : this.baseUrl + 'Api/Files/UploadFiles';

    return this._httpClient.post<BaseApiResponseWithFilesIds>(
      endpoint,
      formData,
      withProgress ? { reportProgress: true, observe: 'events' } : undefined,
    );
  }
}
