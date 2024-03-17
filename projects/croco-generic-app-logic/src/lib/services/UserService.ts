import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiResponse, ClientModel, EditApplicationUser, GenericBaseApiResponse, GetListResult, RegisterModel, UserSearch, UserWithNameAndEmailAvatarModel } from "../models";

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
      ) {}
    
    public getUsers(searchModel: UserSearch): Observable<GetListResult<UserWithNameAndEmailAvatarModel>>
    {
      return this.http.post<GetListResult<UserWithNameAndEmailAvatarModel>>(this.baseUrl + 'api/user/search',
          searchModel
      );
    }

    public getUserById(id: string): Observable<GenericBaseApiResponse<ClientModel>>
    {
      return this.http.get<GenericBaseApiResponse<ClientModel>>(this.baseUrl + `api/user/GetById?id=${id}`);
    }

    public createUser(data: RegisterModel): Observable<GenericBaseApiResponse<string>>{
      return this.http.post<GenericBaseApiResponse<string>>(this.baseUrl + 'api/user/create',
        data
      );
    }

    public editUser(data: EditApplicationUser): Observable<BaseApiResponse>{
      return this.http.post<BaseApiResponse>(this.baseUrl + 'api/user/Edit',
        data
      );
    }
}