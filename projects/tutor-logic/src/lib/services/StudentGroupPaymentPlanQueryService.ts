import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentGroupPaymentPlansModel } from "../models";

/**
 * Предоставляет методы контроллера Tutor.Api.Controllers.StudentGroupPaymentPlans.StudentGroupPaymentPlanQueryController
 */
@Injectable({
    providedIn: 'root',
})
export class StudentGroupPaymentPlanQueryService {
    getBaseUrl() {
        return `${this._baseUrl}api/tutor/student-group-payment-plan/query`;
    }

    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string
    ) { }

    /**
     * Получить группу и глобальные планы оплаты с ней связанные
     * @param id идентификатор группы
     * @returns групп с планами оплаты
     */
    public getPaymentPlans(id: string): Observable<StudentGroupPaymentPlansModel> {
        return this._httpClient.get<StudentGroupPaymentPlansModel>(`${this.getBaseUrl()}/payment-plans/${id}`);
    }
}
