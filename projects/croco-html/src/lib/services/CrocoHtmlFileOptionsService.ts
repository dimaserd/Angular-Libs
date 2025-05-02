import { Injectable } from '@angular/core';
import { CrocoHtmlEditorFileOptions } from "../options";

@Injectable({
  providedIn: 'root'
})
export class CrocoHtmlFileOptionsService {
  private readonly localStorageToken = 'crocoHtmlEditorFileOptions'
  private readonly defaultOptions = {
    applicationId: null,
    usePrivateFiles: false,
  }

  set(data: CrocoHtmlEditorFileOptions) {
    localStorage.setItem(this.localStorageToken, JSON.stringify(data));
  }

  get(): CrocoHtmlEditorFileOptions {
    try {
      const data = localStorage.getItem(this.localStorageToken);
      return data ? JSON.parse(data) : this.defaultOptions;
    } catch (e) {
      return this.defaultOptions;
    }
  }
}
