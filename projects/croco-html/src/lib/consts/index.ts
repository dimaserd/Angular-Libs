import {BehaviorSubject} from "rxjs";
import {CrocoHtmlEditorFileOptions} from "../options";

export const CrocoHtmlOptionsToken = "croco-html-options";
export const crocoHtmlEditorFileOptionsToken = new BehaviorSubject<CrocoHtmlEditorFileOptions>(
  {
    usePrivateFiles: false,
    applicationId: null
  }
)
