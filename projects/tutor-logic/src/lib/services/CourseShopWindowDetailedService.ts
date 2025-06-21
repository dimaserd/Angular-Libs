import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { CourseShopWindowDetailedModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class CourseShopWindowDetailedService {
    baseControllerUrl: string;

    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = baseUrl + 'api/tutor/course-shop-window-detailed';
    }

    getMain() {
        return this._httpClient.get<CourseShopWindowDetailedModel>(`${this.baseControllerUrl}/main`);
    }

    getMainCached() {
        return this._httpClient.get<CourseShopWindowDetailedModel>(`${this.baseControllerUrl}/main/cached`);
    }

    getById(id: string) {
        return this._httpClient.get<CourseShopWindowDetailedModel>(`${this.baseControllerUrl}/by-id/${id}`);
    }

    getByIdCached(id: string) {
        return this._httpClient.get<CourseShopWindowDetailedModel>(`${this.baseControllerUrl}/by-id/${id}/cached`);
    }
}
