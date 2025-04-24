import { Injectable } from '@angular/core';
import {CrocoHtmlEditorFileOptions} from "../options";

@Injectable({
  providedIn: 'root'
})
export class CrocoHtmlFileOptionsService {
  private readonly localStorageToken = 'crocoHtmlEditorFileOptions'
  private readonly defaultOptions = {
    applicationId: null,
    usePrivateFiles: false,
  }

  constructor() { }

  set(data: CrocoHtmlEditorFileOptions) {
    localStorage.setItem(this.localStorageToken, JSON.stringify(data));
  }

  get(): CrocoHtmlEditorFileOptions {
    return JSON.parse(localStorage.getItem(this.localStorageToken)) ?? this.defaultOptions;
  }
}
