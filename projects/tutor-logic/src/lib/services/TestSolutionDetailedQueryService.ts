import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentTestSolutionDetailedModel } from "../models";

/**
 * Предоставляет методы для поиска решений тестов 
 */
@Injectable({
    providedIn: 'root',
})
export class TestSolutionDetailedQueryService {

    private _baseUrl: string = "";

    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseUrl = baseUrl + "api/tutor/test-solution/query/";
    }

    /**
     * 
     * @param id Идентификатор решения теста
     * @returns 
     */
    public get(id: string): Observable<StudentTestSolutionDetailedModel> {
        return this._httpClient.get<StudentTestSolutionDetailedModel>(this._baseUrl + `Get/By/Id/${id}/detailed`);
    }
}