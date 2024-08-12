import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse, ChangeQuestionLike } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuestionLikeService {
  baseControllerUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseControllerUrl = baseUrl + 'api/tutor/question-likes/';
  }

  public change(model: ChangeQuestionLike): Observable<BaseApiResponse> {
    return this._httpClient.post<BaseApiResponse>(this.baseControllerUrl + `change`, model);
  }
}
