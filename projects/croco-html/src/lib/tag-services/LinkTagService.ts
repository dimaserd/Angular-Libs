import { HtmlBodyTag, InterfaceBlock } from "../models"
import { CrocoHtmlOptions } from "../options"
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService"

export class LinkTagConsts {
  static readonly TagName = "croco-link"
}

export class LinkTagAttrs {
  static readonly FileId = "file-id"

  static readonly Url = "url"

  static readonly Title = "title"

  static readonly Type = "type"
}

export interface LinkTagData {
  url: string;
  title: string;
  type: string;
  fileId: string;
}

export class LinkTagService implements IMarkUpTagService {

  tagName: string = LinkTagConsts.TagName;
  shortDescription: string = "Ссылка";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {

    const urlVal = bodyTag.attributes[LinkTagAttrs.Url] ?? "";

    const urlValStr = `${LinkTagAttrs.Url}="${urlVal}"`;

    const titleVal = bodyTag.attributes[LinkTagAttrs.Title] ?? "";

    const titleValStr = `${LinkTagAttrs.Title}="${titleVal}"`;

    const typeVal = bodyTag.attributes[LinkTagAttrs.Type] ?? "";

    const typeValStr = typeVal.length > 0 ? `${LinkTagAttrs.Type}="${typeVal}"` : "";

    const attrStr = [urlValStr, titleValStr, typeValStr].join(" ");

    return `<${this.tagName} ${attrStr}></${this.tagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, _: CrocoHtmlOptions): InterfaceBlock {

    const data: LinkTagData = {
      url: elem.getAttribute(LinkTagAttrs.Url),
      title: elem.getAttribute(LinkTagAttrs.Title),
      type: elem.getAttribute(LinkTagAttrs.Type),
      fileId: elem.getAttribute(LinkTagAttrs.FileId),
    };

    return {
      tagName: this.tagName,
      data
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let tagData: LinkTagData = data.data;

    const attrs = {
      [LinkTagAttrs.Url]: tagData.url,
      [LinkTagAttrs.Type]: tagData.type,
      [LinkTagAttrs.FileId]: tagData.fileId,
      [LinkTagAttrs.Title]: tagData.title
    };

    return {
      tagDescription: {
        tag: data.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: attrs,
      innerHtml: ""
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
        [LinkTagAttrs.Title]: 'Презентация',
        [LinkTagAttrs.Url]: 'https://storage.yandexcloud.net/mega-academy/presentation.pdf',
        [LinkTagAttrs.Type]: 'pdf'
      },
      innerHtml: props.htmlRaw,
    };
  }
}