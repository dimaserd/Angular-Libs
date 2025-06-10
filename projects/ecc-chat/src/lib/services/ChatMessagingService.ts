import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApiResponse } from 'croco-generic-app-logic';
import { GenericBaseApiResponse, GetListResult } from 'tutor-logic';

export interface GetChatMessages {
  /* Сколько нужно взять сообщений */
  count: number;
  lessThantUtcTicks: number;
  /* Идентификатор чата */
  chatId: number;
  setUserChatVisit: boolean;
}

export interface ChatMessageModel {
  id: string;
  /* Текст сообщения */
  message: string;
  /* Дата отправки в тиках */
  sentOnUtcTicks: number;
  lastUpdateUtcTicks: number;
  /* Идентификатор отправителя сообщения */
  senderUserId: string;
  tagString: string;
  attachments: Array<ChatMessageAttachmentFileModel>;
}


export interface ChatMessageAttachmentFileModel {
  fileId: string;
  fileName: string;
}

export interface SendMessageToChat {
  chatId: number;
  message: string;
  tagString: string;
  attachmentsSetId: string;
}

export interface EditMessage {
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatMessagingService {
  private readonly baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = `${baseUrl}api/ecc/chat/client/messages`;
  }

  public list(model: GetChatMessages) {
    return this._httpClient.post<GetListResult<ChatMessageModel>>(`${this.baseControllerUrl}/list`, model);
  }

  public send(model: SendMessageToChat) {
    return this._httpClient.post<GenericBaseApiResponse<ChatMessageModel>>(`${this.baseControllerUrl}/send`, model);
  }

  public edit(model: EditMessage) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/edit`, model);
  }

  public delete(id: string) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/delete/${id}`, {});
  }
}
