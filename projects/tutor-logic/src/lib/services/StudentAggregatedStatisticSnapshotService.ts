import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { StudentStatisticSnapshotValueModel } from "../models";

@Injectable({ providedIn: 'root' })
export class StudentAggregatedStatisticSnapshotService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/student-aggregated-statistic-snapshot';
  }

  public get(studentId: string) {
    return this._httpClient.get<StudentStatisticSnapshotValueModel>(`${this.baseControllerUrl}/query/get-by-id/${studentId}`);
  }
}
