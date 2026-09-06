import { HtmlBodyTag } from "../../models";

export interface IVisualEditorLogger {
  onAdd(tag: HtmlBodyTag): void;

  onChange(tag: HtmlBodyTag, index: number): void;

  onRemove(index: number): void;
}