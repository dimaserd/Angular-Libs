import { InterfaceBlock } from "../models/InterfaceBlock";
import { CrocoHtmlOptions } from "../options";
import { BodyTagsExtensions } from "./BodyTagsExtensions";

export class HtmlExtractionMethods {

  static transformHtmlElementToBlocks(element: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock[] {
    const data: InterfaceBlock[] = [];

    for (let i = 0; i < element.children.length; i++) {

      const elem = element.children.item(i) as HTMLElement;
      const loweredTagName = elem.tagName.toLowerCase();

      if (BodyTagsExtensions.hasTagService(loweredTagName, options)) {
        const tagService = BodyTagsExtensions.getTagService(loweredTagName, options);

        const resultBlock = tagService.extractBlockFromHtmlElement(elem, options);
        data.push(resultBlock);

        continue;
      }
      else {
        data.push({
          tagName: "unsupported-tag",
          data: {
            tagString: elem.outerHTML
          }
        });
      }
    }
    
    return data;
  }

  static transformHtmlStringToBlocks(value: string, options: CrocoHtmlOptions): InterfaceBlock[] {

    if (value === undefined || value === null) {
      return [];
    }

    value = value
      .replace('\n', '')
      .replace('\t', '');

    var div = document.createElement("div");
    div.innerHTML = value;

    return this.transformHtmlElementToBlocks(div, options);
  }
}
