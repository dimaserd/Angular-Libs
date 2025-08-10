import { TextTagDataConsts, TextSimpleMethods, SimpleTextTagData, BodyTagsExtensions } from "../extensions";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "../tag-services/IMarkUpTagService";

export class TextTagHtmlMarkupTagService implements IMarkUpTagService {

  constructor(tagName: string, shortDescription: string) {
    this.tagName = tagName;
    this.shortDescription = shortDescription;
  }

  tagName: string = "text";
  shortDescription: string = "T";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName} h-align="${bodyTag.attributes[TextTagDataConsts.HAlign]}">${bodyTag.innerHtml}</${this.tagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return TextSimpleMethods.ExtractTextTag(elem);
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let textTagData = data.data as SimpleTextTagData;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: { "h-align": textTagData.horizontalAlignment },
      innerHtml: BodyTagsExtensions.sanitizeInnerHtml(textTagData.html)
    };
  }
}
