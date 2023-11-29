import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiResponseWithFilesIds } from '../models';


@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  /*
    * Загрузить один файл 
  */
  postFile(file: File, createLocalCopiesNow = false): Observable<BaseApiResponseWithFilesIds> {
    const formData: FormData = new FormData();

    formData.append(`fileKey1`, file, file.name);

    return this.postFilesInner(formData, createLocalCopiesNow);
  }

  /*
    * Загрузить несколько файлов 
  */
  postFiles(files: FileList, createLocalCopiesNow = false): Observable<BaseApiResponseWithFilesIds> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      var fileToUpload = files.item(i);
      formData.append(`fileKey${i}`, fileToUpload, fileToUpload.name);
    }

    return this.postFilesInner(formData, createLocalCopiesNow);
  }

  postFilesInner(formData: FormData, createLocalCopiesNow = false): Observable<BaseApiResponseWithFilesIds> {
    let endpoint = this.baseUrl + 'Api/Files/UploadFiles';

    if (createLocalCopiesNow) {
      endpoint += '/Now';
    }

    return this._httpClient.post<BaseApiResponseWithFilesIds>(endpoint, formData);
  }
}
