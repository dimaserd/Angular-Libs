import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivateFileUploadService } from './PrivateFileUploadService';
import { PublicFilesUploadResponse } from '../models/file-models';

@Injectable({ providedIn: 'root' })
export class PublicFileUploadService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
  ) {}

  public postFiles(files: FileList, executeHandlersNow: boolean, applicationId: string | null): Observable<PublicFilesUploadResponse> {
    const formData = PrivateFileUploadService.getFormData(files);

    return this.postFilesInner(formData, executeHandlersNow, applicationId);
  }

  public postFilesInner(
    formData: FormData,
    executeHandlersNow: boolean,
    applicationId: string | null,
    withProgress: true,
  ): Observable<HttpEvent<PublicFilesUploadResponse>>;

  public postFilesInner(
    formData: FormData,
    executeHandlersNow: boolean,
    applicationId: string | null,
    withProgress?: false,
  ): Observable<PublicFilesUploadResponse>;
  
  public postFilesInner(
    formData: FormData,
    executeHandlersNow: boolean,
    applicationId: string | null,
    withProgress: boolean,
  ): Observable<PublicFilesUploadResponse> | Observable<HttpEvent<PublicFilesUploadResponse>>;
  public postFilesInner(
    formData: FormData,
    executeHandlersNow: boolean,
    applicationId: string | null,
    withProgress = false,
  ): Observable<PublicFilesUploadResponse> | Observable<HttpEvent<PublicFilesUploadResponse>> {
    
    let endpoint = this.baseUrl + `api/files/upload?executeHandlersNow=${executeHandlersNow.toString()}`;

    if (applicationId) {
      endpoint += `&applicationId=${applicationId}`;
    }

    return this._httpClient.post<PublicFilesUploadResponse>(
      endpoint,
      formData,
      withProgress ? { reportProgress: true, observe: 'events' } : undefined,
    );
  }
}
