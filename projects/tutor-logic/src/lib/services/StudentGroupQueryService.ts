import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListResult, StudentGroupSimpleModel } from "../models";
import { SearchStudentGroupsRequest, StudentGroupDetailedModel, SearchStudentsInGroup, StudentInGroupSimpleModel, SearchStudentGroupsByStudentRequest, StudentGroupWithCourseProgressModel } from "../models/group-models";

/**
* Методы контроллера StudentGroupQueryController
*/
@Injectable({
    providedIn: 'root',
})
export class StudentGroupQueryService {

    getBaseUrl() {
        return this._baseUrl + 'api/tutor/student-group';
    }

    constructor(private readonly _httpClient: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string) {
    }

    /**
     * Поиск групп учеников
     */
    public search(model: SearchStudentGroupsRequest): Observable<GetListResult<StudentGroupSimpleModel>> {
        return this._httpClient.post<GetListResult<StudentGroupSimpleModel>>(`${this.getBaseUrl()}/query/search`, model);
    }

    public searchWithProgresses(model: SearchStudentGroupsByStudentRequest): Observable<GetListResult<StudentGroupWithCourseProgressModel>> {
        return this._httpClient.post<GetListResult<StudentGroupWithCourseProgressModel>>(`${this.getBaseUrl()}/query/search/with-progresses`, model);
    }

    /**
     * Получить группу по идентификатору
     * @param id идентификатор группы учеников
     * @returns группу учеников
     */
    public getById(id: string): Observable<StudentGroupDetailedModel> {
        return this._httpClient.get<StudentGroupDetailedModel>(`${this.getBaseUrl()}/query/by-id/${id}`);
    }

    public getByStudentId(id: string): Observable<StudentGroupSimpleModel[]> {
        return this._httpClient.get<StudentGroupSimpleModel[]>(`${this.getBaseUrl()}/by-student/${id}`);
    }

    /**
     * Получить список студентов в группе по фильтру
     * @param model модель для поиска
     * @returns список студентов
     */
    public getStudentsList(model: SearchStudentsInGroup): Observable<GetListResult<StudentInGroupSimpleModel>> {
        return this._httpClient.post<GetListResult<StudentInGroupSimpleModel>>(`${this.getBaseUrl()}/students/search`, model);
    }

    /**
     * Получить студента в группе
     * @param groupId идентификатор группы
     * @param studentId идентификатор студента
     * @returns 
     */
    public getStudentById(groupId: string, studentId: string): Observable<StudentInGroupSimpleModel> {
        return this._httpClient.get<StudentInGroupSimpleModel>(`${this.getBaseUrl()}/students/get-by-id/${groupId}/${studentId}`);
    }
}