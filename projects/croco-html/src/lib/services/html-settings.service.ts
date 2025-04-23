import { Injectable } from '@angular/core';
import {CrocoHtmlEditorFileOptions} from "../options";

@Injectable({
  providedIn: 'root'
})
export class HtmlSettingsService {

  constructor() { }

  set(data: CrocoHtmlEditorFileOptions) {
    localStorage.setItem("crocoHtmlEditorFileOptions", JSON.stringify(data));
  }

  get(): CrocoHtmlEditorFileOptions {
    return JSON.parse(localStorage.getItem('crocoHtmlEditorFileOptions'))
  }
}
