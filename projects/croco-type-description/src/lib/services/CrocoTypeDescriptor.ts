import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CrocoEnumTypeDescription, CrocoTypeDescriptionResult } from "../models";

@Injectable({
    providedIn: 'root',
})
export class CrocoTypeDescriptor {
    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') private readonly _baseUrl: string) {
    }

    public getTypeDescription(typeDisplayFullName: string): Observable<CrocoTypeDescriptionResult> {
        return this._httpClient.post<CrocoTypeDescriptionResult>(this._baseUrl + `Documentation/Type?typeName=${typeDisplayFullName}`, {})
    }

    public getEnumTypeDescription(typeDisplayFullName: string): Observable<CrocoEnumTypeDescription> {
        return this._httpClient.post<CrocoEnumTypeDescription>(this._baseUrl + `Documentation/EnumType?typeName=${typeDisplayFullName}`, {})
    }
}