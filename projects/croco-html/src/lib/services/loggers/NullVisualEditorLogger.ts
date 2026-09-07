import { HtmlBodyTag } from "../../models";
import { IVisualEditorLogger } from "./IVisualEditorLogger";


export class NullVisualEditorLogger implements IVisualEditorLogger {

  onAdd(_: HtmlBodyTag[]): void {
  }
  onChange(_: HtmlBodyTag, _2: number): void {
  }

  onRemove(_: number): void {
  }
}
