import { HtmlBodyTag } from "../../models";
import { IVisualEditorLogger } from "./IVisualEditorLogger";


export class NullVisualEditorLogger implements IVisualEditorLogger {

  onAdd(tag: HtmlBodyTag): void {
  }
  onChange(tag: HtmlBodyTag, index: number): void {
  }

  onRemove(index: number): void {
  }
}
