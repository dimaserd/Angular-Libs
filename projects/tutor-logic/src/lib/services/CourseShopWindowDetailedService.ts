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
        this.baseControllerUrl = baseUrl + 'api/tutor/course-shop-window-detailed/';
    }

    getDefault() {
        return this._httpClient.get<CourseShopWindowDetailedModel>(this.baseControllerUrl + 'default');
    }

    getById(id: string) {
        return this._httpClient.get<CourseShopWindowDetailedModel>(this.baseControllerUrl + `byId/${id}`);
    }
}
