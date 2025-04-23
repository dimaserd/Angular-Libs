import {BehaviorSubject} from "rxjs";
import {CrocoHtmlEditorFileOptions} from "../options";

export const CrocoHtmlOptionsToken = "croco-html-options";
export const crocoHtmlEditorFileOptionsToken = new BehaviorSubject<CrocoHtmlEditorFileOptions>(
  localStorage.getItem('crocoHtmlEditorFileOptions') ? JSON.parse(localStorage.getItem('crocoHtmlEditorFileOptions')) :
  {
    usePrivateFiles: false,
    applicationId: null
  })
