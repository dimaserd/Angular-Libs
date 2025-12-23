import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { GenericBaseApiResponse, BaseApiResponse } from "croco-generic-app-logic";
import { TelegramLinkResponse, TutorUserTelegramData } from "../models";

@Injectable({ providedIn: 'root' })
export class TutorUserTelegramService {
  baseControllerUrl: string;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = `${baseUrl}api/tutor/user-telegram`;
  }

  createLink() {
    return this._httpClient.post<GenericBaseApiResponse<TelegramLinkResponse>>(
      `${this.baseControllerUrl}/create-link`,
      {},
    );
  }

  unLink(id: string) {
    return this._httpClient.post<BaseApiResponse>(`${this.baseControllerUrl}/un-link/${id}`, {});
  }

  getData() {
    return this._httpClient.get<TutorUserTelegramData>(`${this.baseControllerUrl}/get-data`);
  }
}