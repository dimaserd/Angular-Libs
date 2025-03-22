import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { BaseApiResponse, GetListResult, OrderPaymentSystemsRequest, PaymentSystemModel, SearchPaymentSystemsRequest } from "../models";

@Injectable({
    providedIn: 'root',
})
export class PmtSystemService {
    private baseControllerUrl: string;

    constructor(
        private readonly _http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = `${baseUrl}api/pmt/system`;
    }

    search(model: SearchPaymentSystemsRequest) {
        return this._http.post<GetListResult<PaymentSystemModel>>(`${this.baseControllerUrl}/search`, model);
    }

    getEnabledSystemsCached() {
        return this._http.get<PaymentSystemModel[]>(`${this.baseControllerUrl}/cache/enabled-list`);
    }

    getById(name: string) {
        return this._http.get<PaymentSystemModel>(`${this.baseControllerUrl}/get/by-id/${name}`);
    }

    order(model: OrderPaymentSystemsRequest) {
        return this._http.post<BaseApiResponse>(`${this.baseControllerUrl}/order`, model);
    }

    createOrUpdate(model: PaymentSystemModel) {
        return this._http.post<BaseApiResponse>(`${this.baseControllerUrl}/create-or-update`, model);
    }
}
