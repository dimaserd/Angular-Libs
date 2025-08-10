import { HtmlBodyTag } from "../models/models";
import { HtmlExtractionMethods } from "./HtmlExtractionMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { HtmlRawTagDataConsts } from "./HtmlRawTagDataConsts";
import { FileImageTagDataConsts } from "./ImageMethods";
import { TextTags } from "./TextMethods";
import { SimpleTextTagData, TextSimpleMethods, TextTagDataConsts } from "./TextSimpleMethods";
import { Tags } from "./Tags";
import { ExternalVideoSupportedTypes, ExternalVideoTagDataConsts } from "./VideoMethods";
import { DownloadButtonTagDataConsts } from "./DownloadButtonMethods";
import { ButtonTagDataConsts } from "./ButtonMethods";
import { CrocoHtmlOptions } from "../options";
import { CustomWidgetTagData, CustomWidgetTagDataConsts } from "./CustomWidgetMethods";
import { FileImageTagData } from "../models/image-models";

export interface IMarkUpTagService {
  /**
   * Название тега
   */
  tagName: string;

  /**
   * Описание тега
   */
  shortDescription: string;

  /**
   * Функция для конвертации модели редактора в Html строку разметки
   * @param bodyTag тег
   * @returns 
   */
  bodyTagToHtmlStringConverter: (bodyTag: HtmlBodyTag) => string;

  extractBlockFromHtmlElement: (elem: HTMLElement, options: CrocoHtmlOptions) => InterfaceBlock;

  /**
   * Конвертация блока интерфейса в модель тега для редактора
   * @param data 
   * @returns 
   */
  toBodyTag: (data: InterfaceBlock) => HtmlBodyTag;
}

export class TextTagHtmlMarkupTagService implements IMarkUpTagService {

  constructor(tagName: string, shortDescription: string){
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
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: { "h-align": textTagData.horizontalAlignment },
        innerHtml: BodyTagsExtensions.sanitizeInnerHtml(textTagData.html)
      };
  }
}

export class BodyTagsExtensions {

  public static tagServices: { [id: string] : IMarkUpTagService; } = {
    "text": new TextTagHtmlMarkupTagService("text", "T"),
    "h1": new TextTagHtmlMarkupTagService("h1", "H1"),
    "h2": new TextTagHtmlMarkupTagService("h2", "H2"),
    "h3": new TextTagHtmlMarkupTagService("h3", "H3"),
    "h4": new TextTagHtmlMarkupTagService("h4", "H4"),
    "h5": new TextTagHtmlMarkupTagService("h5", "H5"),
    "h6": new TextTagHtmlMarkupTagService("h6", "H6"),
  }

  static getDescription(tagName: string) {
    var descriptions = {
      "text": "T",
      "h1": "H1",
      "h2": "H2",
      "h3": "H3",
      "h4": "H4",
      "h5": "H5",
      "h6": "H6",
      [FileImageTagDataConsts.TagName]: "Изображение",
      [ExternalVideoTagDataConsts.TagName]: "Видео",
      [DownloadButtonTagDataConsts.TagName]: "Кнопка",
      [HtmlRawTagDataConsts.TagName]: "Разметка",
      [DownloadButtonTagDataConsts.TagName]: "Кнопка для скачивания",
      [ButtonTagDataConsts.TagName]: "Кнопка",
      [CustomWidgetTagDataConsts.TagName]: "Виджет"
    };

    return descriptions[tagName];
  }

  static convertToHtmlString(bodyTag: HtmlBodyTag): string {
      const tagName = bodyTag.tagDescription.tag;

      if (this.tagServices.hasOwnProperty(tagName)) {
        return this.tagServices[tagName].bodyTagToHtmlStringConverter(bodyTag);
      }

      if (bodyTag.tagDescription.tag === ExternalVideoTagDataConsts.TagName) {
        let useResponsiveWrapperAttr = '';
        if (bodyTag.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName] === ExternalVideoSupportedTypes.Code) {
          useResponsiveWrapperAttr = `${ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName}="${bodyTag.attributes[ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName] || false}"`
        }
        return `<${bodyTag.tagDescription.tag} ${useResponsiveWrapperAttr} type="${bodyTag.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName]}" link="${bodyTag.attributes[ExternalVideoTagDataConsts.LinkAttrName]}">${bodyTag.innerHtml}</${bodyTag.tagDescription.tag}>`
      }

      if (bodyTag.tagDescription.tag === HtmlRawTagDataConsts.TagName) {
        return `<${bodyTag.tagDescription.tag}>${bodyTag.innerHtml}</${bodyTag.tagDescription.tag}>`
      }

      if (bodyTag.tagDescription.tag === DownloadButtonTagDataConsts.TagName) {
        return `<${bodyTag.tagDescription.tag} title="${bodyTag.attributes[DownloadButtonTagDataConsts.TitleAttrName]}" link="${bodyTag.attributes[DownloadButtonTagDataConsts.LinkAttrName]}"></${bodyTag.tagDescription.tag}>`
      }

      if (bodyTag.tagDescription.tag === ButtonTagDataConsts.TagName) {
        return `<${bodyTag.tagDescription.tag} text="${bodyTag.attributes[ButtonTagDataConsts.TextAttrName]}" type="${bodyTag.attributes[ButtonTagDataConsts.TypeAttrName]}"  click="${bodyTag.attributes[ButtonTagDataConsts.ClickAttrName]}"></${bodyTag.tagDescription.tag}>`
      }

      if (bodyTag.tagDescription.tag === CustomWidgetTagDataConsts.TagName) {
        return `<${bodyTag.tagDescription.tag} type="${bodyTag.attributes[CustomWidgetTagDataConsts.TypeAttrName]}" data-id="${bodyTag.attributes[CustomWidgetTagDataConsts.DataIdAttrName]}"  widget-id="${bodyTag.attributes[CustomWidgetTagDataConsts.WidgetIdAttrName]}"></${bodyTag.tagDescription.tag}>`
      }

      if (bodyTag.tagDescription.tag === FileImageTagDataConsts.TagName) {
        return BodyTagsExtensions.imageTagToHtml(bodyTag);
      }

      return `<mapper-not-found>"${bodyTag.tagDescription.tag}" тег не найден.</mapper-not-found>`;
  }

  static bodyTagsToHtml(bodyTags: HtmlBodyTag[]): string {
    let htmls = bodyTags.map(bodyTag => (BodyTagsExtensions.convertToHtmlString(bodyTag)));

    let result = "";

    for (let index = 0; index < htmls.length; index++) {
      const element = htmls[index];

      result += element;
    }

    return result;
  }

  static imageTagToHtml(imageTag: HtmlBodyTag) {
    let fileIdAttr = "";
    let screenMediaRequestAttr = "";

    if (imageTag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && imageTag.attributes[FileImageTagDataConsts.FileIdAttrName]) {
      fileIdAttr = `${FileImageTagDataConsts.FileIdAttrName}="${imageTag.attributes[FileImageTagDataConsts.FileIdAttrName]}"`;
    }

    if (imageTag.attributes.hasOwnProperty(FileImageTagDataConsts.ScreenMediaRequest) && imageTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]) {
      screenMediaRequestAttr = `${FileImageTagDataConsts.ScreenMediaRequest}="${imageTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]}"`;
    }

    return `<${FileImageTagDataConsts.TagName} ${fileIdAttr} ${screenMediaRequestAttr}></${FileImageTagDataConsts.TagName}>`;
  }

  static getBodyTags(html: string, options: CrocoHtmlOptions) {
    let result = HtmlExtractionMethods.transformHtmlStringToBlocks(html, options);
    return result.map(x => BodyTagsExtensions.toBodyTag(x));
  }

  static sanitizeInnerHtml(html: string): string {
    return html.trim().replace('\n\t', '');
  }

  static toBodyTag(data: InterfaceBlock): HtmlBodyTag {
    
    if (this.tagServices.hasOwnProperty(data.type)) {
      return this.tagServices[data.type].toBodyTag(data);
    }

    if (data.type === FileImageTagDataConsts.TagName) {

      let fileData = data.data as FileImageTagData;

      let attrs = {};

      if (fileData.fileId) {
        attrs[FileImageTagDataConsts.FileIdAttrName] = fileData.fileId;
      }

      if (fileData.screenMediaRequest) {
        attrs[FileImageTagDataConsts.ScreenMediaRequest] = fileData.screenMediaRequest;
      }

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: FileImageTagDataConsts.TagName,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: attrs,
        innerHtml: ""
      };
    }

    if (data.type === ExternalVideoTagDataConsts.TagName) {
      let fileData = data.data as ExternalVideoTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === ButtonTagDataConsts.TagName) {
      let fileData = data.data as ButtonTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === DownloadButtonTagDataConsts.TagName) {
      let fileData = data.data as ButtonTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === CustomWidgetTagDataConsts.TagName) {
      let customWidgetTagData = data.data as CustomWidgetTagData;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: customWidgetTagData,
        innerHtml: ""
      };
    }

    if (data.type === HtmlRawTagDataConsts.TagName) {

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: HtmlRawTagDataConsts.TagName,
          displayValue: BodyTagsExtensions.getDescription(data.type),
          isCustom: false
        },
        attributes: {},
        innerHtml: BodyTagsExtensions.sanitizeInnerHtml(data.data["innerHTML"])
      };
    }

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: Tags.UnsupportedTag,
        displayValue: "Неподдерживаемый тег",
        isCustom: false
      },
      attributes: {},
      innerHtml: JSON.stringify(data)
    };
  }
}
