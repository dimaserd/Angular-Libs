import { BodyTagsExtensions } from "../extensions";
import { InterfaceBlock } from "../models/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

export class HtmlRawTagDataConsts {
  static readonly TagName = "html-raw";
}

export interface ExtractHtmlRawTag {
  type: string;
  data: ExtractHtmlRawTagData;
}

export interface ExtractHtmlRawTagData {
  innerHTML: string;
}


export class HtmlRawTagService implements IMarkUpTagService {

  tagName: string = HtmlRawTagDataConsts.TagName;
  shortDescription: string = "Разметка";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName}>${bodyTag.innerHtml}</${this.tagName}>`
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return {
      tagName: HtmlRawTagDataConsts.TagName,
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

  getDefaultValue(props: IVisualEditorProps): HtmlBodyTag {
    return {
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: {
      },
      presentOrEdit: false,
      innerHtml: props.htmlRaw,
    };
  }
}
