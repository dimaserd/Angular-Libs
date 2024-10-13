import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { SearchStudentGroupMaterialsRequest, StudentGroupWithMaterialsModel } from "../models/material-models";
import { Observable } from "rxjs";
import { GetListResult } from "../models";

@Injectable({ providedIn: 'root' })
export class StudentGroupMaterialService {
    baseControllerUrl: string;

    constructor(
        private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = `${baseUrl}api/tutor/student-group/query`;
    }

    getMaterials(model: SearchStudentGroupMaterialsRequest): Observable<GetListResult<StudentGroupWithMaterialsModel>> {
        return this._httpClient.post<GetListResult<StudentGroupWithMaterialsModel>>(`${this.baseControllerUrl}/materials/search`, model);
    }
}
