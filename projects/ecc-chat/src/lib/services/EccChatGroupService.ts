import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import {ChatGroupUserModel} from "../models/ecc-chat-group.interface";

@Injectable({
  providedIn: 'root',
})
export class EccChatGroupService {
  private readonly baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseControllerUrl = `${baseUrl}api/ecc/chat-group/client`;
  }

  getUsers(id: string) {
    return this._httpClient.get<ChatGroupUserModel[]>(`${this.baseControllerUrl}/query/by-id/${id}/users`);
  }
}
