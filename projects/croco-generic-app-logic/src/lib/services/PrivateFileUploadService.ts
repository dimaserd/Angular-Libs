import { HttpClient, HttpUploadProgressEvent, HttpResponse, HttpEventType, HttpEvent } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable, of, filter, switchMap, throwError } from "rxjs";
import { UploadPrivateFilesWithProgressResult, PrivateFilesCreatedResult } from "../models/private-file-models";

/**
 * Сервис для загрузки приватных файлов на сервер
 */
@Injectable({
    providedIn: 'root',
})
export class PrivateFileUploadService {
    _baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseControllerUrl = `${baseUrl}api/private-files`;
    }

    /**
     * Загрузить приватные файлы
     * @param files Файлы для загрузки
     * @returns
     */
    public upload(files: FileList, executeHandlersNow: boolean, applicationId: string = null) {
        const formData = PrivateFileUploadService.getFormData(files);
        return this.postFiles(formData, executeHandlersNow, applicationId);
    }

    /**
     * Загрузить приватные файлы с прогрессом
     * @param files Файлы для загрузки
     * @returns
     */
    public uploadWithProgress(files: FileList, executeHandlersNow: boolean, applicationId: string): Observable<UploadPrivateFilesWithProgressResult> {
        if (!files) {
            return of();
        }

        const formData = PrivateFileUploadService.getFormData(files);

        let uploadingLoaded: number;
        let uploadingTotal: number;
        return this.postFilesWithProgress(formData, executeHandlersNow, applicationId).pipe(
            filter((event): event is HttpUploadProgressEvent | HttpResponse<PrivateFilesCreatedResult> => {
                return event.type === HttpEventType.UploadProgress || event.hasOwnProperty('body');
            }),
            switchMap((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    uploadingLoaded = event.loaded;
                    uploadingTotal = event.total;
                    return [{ loading: true, uploadingLoaded, uploadingTotal, setId: '' }];
                } else {

                    if (event) {
                        return [
                            {
                                loading: false,
                                setId: event.body.setId,
                                uploadingLoaded,
                                uploadingTotal,
                            },
                        ];
                    } else {
                        return throwError(() => new Error(event.body.errorMessage));
                    }
                }
            })
        );
    }

    private postFiles(formData: FormData, executeHandlersNow: boolean, applicationId: string): Observable<PrivateFilesCreatedResult> {
        const url = this.buildUrl(executeHandlersNow, applicationId);
        return this._httpClient.post<PrivateFilesCreatedResult>(url, formData);
    }

    private postFilesWithProgress(formData: FormData, executeHandlersNow: boolean, applicationId: string): Observable<HttpEvent<PrivateFilesCreatedResult>> {
        const url = this.buildUrl(executeHandlersNow, applicationId);
        return this._httpClient.post<PrivateFilesCreatedResult>(url, formData, { reportProgress: true, observe: 'events' });
    }

    private buildUrl(executeHandlersNow: boolean, applicationId: string) {
        let url = `${this._baseControllerUrl}/upload?executeHandlersNow=${executeHandlersNow.toString().toLowerCase()}`;

        if (applicationId) {
            url += `&applicationId=${applicationId}`;
        }

        return url;
    }

    public static getFormData(files: FileList): FormData {
        const formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {
            var fileToUpload = files.item(i);
            formData.append(`fileKey${i}`, fileToUpload, fileToUpload?.name);
        }

        return formData;
    }
}
