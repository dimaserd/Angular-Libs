import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, ClientModel, EditApplicationUser, GetListResult, RegisterModel, RegistrationResult, UserSearch, UserWithNameAndEmailAvatarModel } from "../models";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private readonly _http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  public getUsers(searchModel: UserSearch): Observable<GetListResult<UserWithNameAndEmailAvatarModel>> {
    return this._http.post<GetListResult<UserWithNameAndEmailAvatarModel>>(`${this.baseUrl}api/user/search`,
      searchModel
    );
  }

  public getUserById(id: string): Observable<ClientModel> {
    return this._http.get<ClientModel>(`${this.baseUrl}api/user/GetById?id=${id}`);
  }

  public createUser(data: RegisterModel): Observable<RegistrationResult> {
    return this._http.post<RegistrationResult>(`${this.baseUrl}api/user/create`,
      data
    );
  }

  public editUser(data: EditApplicationUser): Observable<BaseApiResponse> {
    return this._http.post<BaseApiResponse>(`${this.baseUrl}api/user/Edit`,
      data
    );
  }
}