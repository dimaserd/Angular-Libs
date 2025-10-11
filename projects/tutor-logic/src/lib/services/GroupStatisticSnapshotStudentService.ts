import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { GetStudentInGroupStatisticSnapshotRequest, StudentGroupStatisticSnapshotInfoModel, StudentInGroupStatisticSnapshotModel } from "../models";

@Injectable({
    providedIn: 'root',
})
export class GroupStatisticSnapshotStudentService {
    baseControllerUrl: string;

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.baseControllerUrl = `${baseUrl}api/tutor/student-in-group-statistic-snapshot`;
    }

    /**
     * 
     * @param model запрос для получения снапшота агрегированной статистики ученика по предметам и тегам в рамках группы (курса)
     * @returns 
     */
    get(model: GetStudentInGroupStatisticSnapshotRequest) {
        return this._httpClient.post<StudentInGroupStatisticSnapshotModel | null>(`${this.baseControllerUrl}/get`, model);
    }

    /**
     * Получить информацию о снапшоте.
     * @param id идентификатор снепшота
     * @returns 
     */
    getSnapshotInfo(id: string) {
        return this._httpClient.get<StudentGroupStatisticSnapshotInfoModel | null>(`${this.baseControllerUrl}/snapshot-info/${id}`);
    }
}
