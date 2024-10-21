import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { BaseApiResponse } from "../models";
import { SettingModel } from "../models/setting-models";

@Injectable({
    providedIn: 'root',
})
export class TutorCommonSettingsService {
    baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = baseUrl + 'api/tutor/settings/';
    }

    get(name: string) {
        return this._httpClient.get<SettingModel>(this.baseControllerUrl + 'get/' + name);
    }

    getCached(name: string) {
        return this._httpClient.get<SettingModel>(this.baseControllerUrl + 'get/' + name + '/cached');
    }

    set(model: SettingModel) {
        return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + 'set', model);
    }
}


