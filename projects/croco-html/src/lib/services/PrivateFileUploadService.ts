import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UploadPrivateFilesWithProgressEvent {
  loading: boolean;
  response?: PrivateFilesCreatedResult;
  uploadingLoaded: number;
  uploadingTotal: number;
}

export interface PrivateFilesCreatedResult {
  succeeded: boolean; 
  errorMessage: string; 
  setId: string; 
  fileIds: Array<string>; 
}

@Injectable({ providedIn: 'root' })
export class PublicFileUploadService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
  ) {}

  public postFiles(files: FileList, applicationId: string | null): Observable<PrivateFilesCreatedResult> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      var fileToUpload = files.item(i);
      formData.append(`fileKey${i}`, fileToUpload as Blob, fileToUpload?.name);
    }

    return this.postFilesInner(formData, applicationId);
  }

  public postFilesInner(
    formData: FormData,
    applicationId: string | null,
    withProgress: true,
  ): Observable<HttpEvent<PrivateFilesCreatedResult>>;

  public postFilesInner(
    formData: FormData,
    applicationId: string | null,
    withProgress?: false,
  ): Observable<PrivateFilesCreatedResult>;
  
  public postFilesInner(
    formData: FormData,
    applicationId: string | null,
    withProgress: boolean,
  ): Observable<PrivateFilesCreatedResult> | Observable<HttpEvent<PrivateFilesCreatedResult>>;
  public postFilesInner(
    formData: FormData,
    applicationId: string | null,
    withProgress = false,
  ): Observable<PrivateFilesCreatedResult> | Observable<HttpEvent<PrivateFilesCreatedResult>> {
    let endpoint = this.baseUrl + `api/private-files/upload?createCopiesNow=true`;

    if (applicationId) {
      endpoint += `&applicationId=${applicationId}`;
    }

    return this._httpClient.post<PrivateFilesCreatedResult>(
      endpoint,
      formData,
      withProgress ? { reportProgress: true, observe: 'events' } : undefined,
    );
  }
}
