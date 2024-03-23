import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { JsOpenApiDocs, JsScriptExecutedResult, RemoteJsOpenApiDocs } from "../models";

@Injectable({
    providedIn: 'root',
})
export class JsScriptExecutor{
    
    constructor(private _httpClient: HttpClient,
         @Inject('BASE_URL') private _url: string){
    }

    public getDocs(){
        return this._httpClient.get<JsOpenApiDocs>(this._url + 'JsOpenApi/GetDocs');
    }

    public getRemoteDocs(){
        return this._httpClient.get<RemoteJsOpenApiDocs[]>(this._url + 'JsOpenApi/GetRemoteDocs', {})
    }

    public ExecuteScript(script: string) {
        
        let data = {
            script: script
        };
        
        return this._httpClient.post<JsScriptExecutedResult>(this._url + "JsOpenApi/Execute", data);
    }
}