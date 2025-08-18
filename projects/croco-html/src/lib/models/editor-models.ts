import { BehaviorSubject } from "rxjs";
import { HtmlBodyTag } from "./models";

export class TagEditorService {
  public readonly tag$ = new BehaviorSubject<HtmlBodyTag>(null);
  public readonly presentOrEdit$ = new BehaviorSubject<boolean>(true);
}