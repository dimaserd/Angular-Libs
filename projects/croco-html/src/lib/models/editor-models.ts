import { HtmlBodyTag } from "./models";

export interface ISingleTagStorage {
  set(tag: HtmlBodyTag): void;

  get(): HtmlBodyTag;
}