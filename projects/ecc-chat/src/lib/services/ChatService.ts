import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApiResponse } from 'croco-generic-app-logic';
import { Observable } from 'rxjs';
import { GetListResult } from 'tutor-logic';

export interface ChatDetailedModel {
  /* Идентификатор чата */
  id: number;
  isSystem: boolean;
  /* Является ли данный чат диалогом */
  isDialog: boolean;
  /* Название чата */
  chatName: string;
  /* Тип чата */
  chatType: string;
  /* Идентификатор группы чатов */
  groupId: string;
  lastMessage: ChatMessageSimpleModel;
  /* Пользователи в чате */
  users: Array<UserInChatModel>;
}

export interface UserInChatModel {
  user: EccUserModel;
  lastVisitUtcTicks: number;
}

export interface EccUserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  noEmail: boolean;
  noPhoneNumber: boolean;
  applicationId: string;
  avatarFileId: number | null;
}

export interface CreateOrGetExistingDialogWithUserResponse {
  succeeded: boolean;
  errorMessage: string;
  chatId: number;
}

export interface GetChatsList {
  filter: ChatsFilter;
  count: number | null;
  offSet: number;
}

export interface ChatsFilter {
  isDialog: boolean | null;
  isSystem: boolean | null;
  showChatsFromGroup: boolean | null;
  type: string;
}

export interface ChatSimpleModel {
  /* Идентификатор чата */
  id: number;
  /* Является ли данный чат диалогом */
  isDialog: boolean;
  countOfUnreadMessages: number;
  lastMessageSentOnUtcTicks: number;
  /* Название чата */
  chatName: string;
  chatType: string;
  groupId: string;
  /* Последнее отправленное сообщение */
  lastMessage: ChatMessageSimpleModel;
}

export interface ChatMessageSimpleModel {
  id: string;
  /* Текст сообщения */
  message: string;
  /* Дата отправки в тиках */
  sentOnUtcTicks: number;
  lastUpdateUtcTicks: number;
  /* Идентификатор отправителя сообщения */
  senderUserId: string;
  tagString: string;
}

export interface ChatSimpleModelWithUsers {
  chat: ChatSimpleModel;
  users: Array<UserInChatModel>;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = `${baseUrl}api/ecc/chat/client`;
  }

  public getById(id: number): Observable<ChatDetailedModel> {
    return this._httpClient.get<ChatDetailedModel>(`${this.baseControllerUrl}/query/by-id/${id}`);
  }

  public getOrCreateDialog(userId: string): Observable<CreateOrGetExistingDialogWithUserResponse> {
    return this._httpClient.post<CreateOrGetExistingDialogWithUserResponse>(
      `${this.baseControllerUrl}/get-or-create-dialog/${userId}`,
      {},
      { withCredentials: true },
    );
  }

  public search(model: GetChatsList): Observable<GetListResult<ChatSimpleModel>> {
    return this._httpClient.post<GetListResult<ChatSimpleModel>>(`${this.baseControllerUrl}/query/search`, model);
  }

  public searchWithUsers(model: GetChatsList): Observable<GetListResult<ChatSimpleModelWithUsers>> {
    return this._httpClient.post<GetListResult<ChatSimpleModelWithUsers>>(
      `${this.baseControllerUrl}/query/search/with-users`,
      model,
    );
  }

  public visitChat(chatId: number): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/visit/${chatId}`, {});
  }
}


