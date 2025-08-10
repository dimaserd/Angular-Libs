import { ButtonTagDataConsts } from "../extensions/ButtonMethods";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "./IMarkUpTagService";

export class DownloadButtonTagDataConsts {
  static TagName = "download-file-button";
  static TitleAttrName = "title";
  static LinkAttrName = "link";
}

export interface DownloadButtonTag {
  type: string;
  data: DownloadButtonTagData;
}

export interface DownloadButtonTagData {
  title: string;
  link: string;
}

export class DownloadButtonTagService implements IMarkUpTagService {
  tagName: string = DownloadButtonTagDataConsts.TagName;
  shortDescription: string = "Кнопка для скачивания";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName} title="${bodyTag.attributes[DownloadButtonTagDataConsts.TitleAttrName]}" link="${bodyTag.attributes[DownloadButtonTagDataConsts.LinkAttrName]}"></${this.tagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return {
      type: DownloadButtonTagDataConsts.TagName,
      data: {
        title: elem.getAttribute(DownloadButtonTagDataConsts.TitleAttrName),
        link: elem.getAttribute(DownloadButtonTagDataConsts.LinkAttrName)
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let fileData = data.data as ButtonTagDataConsts;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: data.type,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: fileData,
      innerHtml: ""
    };
  }
}
