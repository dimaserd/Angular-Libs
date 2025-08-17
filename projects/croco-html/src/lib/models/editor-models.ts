import { HtmlBodyTag } from "./models";

export interface ISingleTagVisualEditor {
  tagUpdated(tag: HtmlBodyTag): void;
}