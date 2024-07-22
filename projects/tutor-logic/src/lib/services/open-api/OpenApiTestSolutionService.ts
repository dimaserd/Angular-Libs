import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { StudentTestSolutionModel } from "../../models";

@Injectable({
    providedIn: 'root',
})
export class OpenApiTestSolutionService {
    
    private readonly _baseUrl: string = "";

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
    ) {
        this._baseUrl = `${this._baseUrl}api/tutor/open-api/test-soluton`;
    }

    public getById(id: string) {
        return this._httpClient.get<StudentTestSolutionModel>(`${this._baseUrl}/${id}`);
    }
}
