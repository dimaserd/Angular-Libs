import { HtmlBodyTag } from "../../models";

export interface IVisualEditorLogger {
  onAdd(tags: HtmlBodyTag[]): void;

  onChange(tag: HtmlBodyTag, index: number): void;

  onRemove(index: number): void;
}