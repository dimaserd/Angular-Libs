import { BodyTagsExtensions } from "../extensions";
import { HtmlRawTagDataConsts } from "../extensions/HtmlRawTagDataConsts";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "./IMarkUpTagService";

export class HtmlRawTagService implements IMarkUpTagService {
  tagName: string = HtmlRawTagDataConsts.TagName;
  shortDescription: string = "Разметка";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName}>${bodyTag.innerHtml}</${this.tagName}>`
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return {
      type: HtmlRawTagDataConsts.TagName,
      data: {
        innerHTML: elem.innerHTML
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: HtmlRawTagDataConsts.TagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: {},
      innerHtml: BodyTagsExtensions.sanitizeInnerHtml(data.data["innerHTML"])
    };
  }
}
