import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { JsOpenApiDocs, JsScriptExecutedResult, RemoteJsOpenApiDocs } from "../models";

@Injectable({
    providedIn: 'root',
})
export class JsScriptExecutor{
    
    private _baseUrl = "";

    constructor(private _httpClient: HttpClient,
         @Inject('BASE_URL') private _url: string) {
        this._baseUrl = `${_url}api/admin/js-open-api`;
    }

    public getDocs(){
        return this._httpClient.get<JsOpenApiDocs>(`${this._baseUrl}/GetDocs`);
    }

    public getRemoteDocs(){
        return this._httpClient.get<RemoteJsOpenApiDocs[]>(`${this._baseUrl}/GetRemoteDocs`, {})
    }

    public ExecuteScript(script: string) {
        
        let data = {
            script: script
        };
        
        return this._httpClient.post<JsScriptExecutedResult>(`${this._baseUrl}/Execute`, data);
    }
}