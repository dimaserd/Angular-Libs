import { InterfaceBlock } from "../models/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { ButtonTagDataConsts } from "./ButtonTagService";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

const defaultLinkForDownload = "https://storage.yandexcloud.net/mega-academy/presentation.pdf";

export class DownloadButtonTagDataConsts {
  static readonly TagName = "download-file-button";
  static readonly TitleAttrName = "title";
  static readonly LinkAttrName = "link";
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
      tagName: DownloadButtonTagDataConsts.TagName,
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
        tag: data.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: fileData,
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
        [DownloadButtonTagDataConsts.LinkAttrName]: defaultLinkForDownload,
        [DownloadButtonTagDataConsts.TitleAttrName]: 'Скачать'
      },
      presentOrEdit: false,
      innerHtml: props.htmlRaw,
    };
  }
}
