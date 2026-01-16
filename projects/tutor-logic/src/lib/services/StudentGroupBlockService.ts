import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BaseApiResponse,  } from "../models";
import { GetMyStudentGroupBlockRequest, StudentInGroupSetBlockingDateModel, StudentInGroupSetBlockingModel, StudentInGroupWithBlockModel } from "../models/student-block-models";

@Injectable({
  providedIn: 'root',
})
export class StudentGroupBlockService {
  private readonly _baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this._baseControllerUrl = `${baseUrl}api/tutor/student-group/block`;
  }

  public setDate(model: StudentInGroupSetBlockingDateModel) {
    return this._httpClient.post<BaseApiResponse>(`${this._baseControllerUrl}/date`, model);
  }

  public setState(model: StudentInGroupSetBlockingModel) {
    return this._httpClient.post<BaseApiResponse>(`${this._baseControllerUrl}/state`, model);
  }

  public getMineV2(model: GetMyStudentGroupBlockRequest) {
    return this._httpClient.post<StudentInGroupWithBlockModel>(`${this._baseControllerUrl}/query/v2/mine`, model);
  }
}

