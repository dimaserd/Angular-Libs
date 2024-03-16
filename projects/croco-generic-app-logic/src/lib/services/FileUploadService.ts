import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiResponseWithFilesIds } from '../models';
import { filter, switchMap } from 'rxjs/operators';

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

  public postFile(
    file: File,
    createLocalCopiesNow: boolean,
    withProgress: true,
  ): Observable<HttpEvent<BaseApiResponseWithFilesIds>>;

  public postFile(
    file: File,
    createLocalCopiesNow?: boolean,
    withProgress?: false,
  ): Observable<BaseApiResponseWithFilesIds>;

  public postFile(
    file: File,
    createLocalCopiesNow?: boolean,
    withProgress?: boolean,
  ): Observable<BaseApiResponseWithFilesIds> | Observable<HttpEvent<BaseApiResponseWithFilesIds>>;

  public postFile(
    file: File,
    createLocalCopiesNow = false,
    withProgress = false,
  ): Observable<BaseApiResponseWithFilesIds> | Observable<HttpEvent<BaseApiResponseWithFilesIds>> {
    const formData: FormData = new FormData();

    formData.append(`fileKey1`, file, file.name);

    return this.postFilesInner(formData, createLocalCopiesNow, withProgress);
  }

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
    let endpoint = this.baseUrl + 'Api/Files/UploadFiles';

    if (createLocalCopiesNow) {
      endpoint += '/Now';
    }

    return this._httpClient.post<BaseApiResponseWithFilesIds>(
      endpoint,
      formData,
      withProgress ? { reportProgress: true, observe: 'events' } : undefined,
    );
  }

  public uploadFileWithProgress(file: File, createLocalCopiesNow = false): Observable<UploadFileWithProgressEvent> {
    let uploadingLoaded: number;
    let uploadingTotal: number;
    return this.postFile(file, createLocalCopiesNow, true).pipe(
      filter((event): event is HttpUploadProgressEvent | HttpResponse<BaseApiResponseWithFilesIds> => {
        return event.type === HttpEventType.UploadProgress || event instanceof HttpResponse;
      }),
      switchMap((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          uploadingLoaded = event.loaded;
          uploadingTotal = event.total;
          return [{ loading: true, uploadingLoaded, uploadingTotal }];
        } else {
          if (event.body.responseObject?.[0]) {
            return [
              {
                loading: false,
                fileId: event.body.responseObject[0],
                uploadingLoaded,
                uploadingTotal,
              },
            ];
          } else {
            return throwError(() => new Error(event.body.message));
          }
        }
      }),
    );
  }
}