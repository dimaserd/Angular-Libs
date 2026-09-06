import { HtmlBodyTag } from "../../models";
import { IVisualEditorLogger } from "./IVisualEditorLogger";

export class ConsoleVisualEditorLogger implements IVisualEditorLogger {
  onAdd(tag: HtmlBodyTag): void {
    console.log("onAdd", tag);
  }

  onChange(tag: HtmlBodyTag, index: number): void {

    const tagCopy = JSON.parse(JSON.stringify(tag));

    console.log("onChange", tagCopy, index);
  }

  onRemove(index: number): void {
    console.log("onRemove", index);
  }
}
