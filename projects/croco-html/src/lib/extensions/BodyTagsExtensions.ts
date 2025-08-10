import { HtmlBodyTag } from "../models/models";
import { HtmlExtractionMethods } from "./HtmlExtractionMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { HtmlRawTagDataConsts } from "./HtmlRawTagDataConsts";
import { FileImageTagDataConsts } from "./ImageMethods";
import { Tags } from "./Tags";
import { ExternalVideoTagDataConsts } from "./VideoMethods";
import { ButtonTagDataConsts } from "./ButtonMethods";
import { CrocoHtmlOptions } from "../options";
import { CustomWidgetTagData, CustomWidgetTagDataConsts } from "./CustomWidgetMethods";
import { IMarkUpTagService } from "../tag-services/IMarkUpTagService";
import { DownloadButtonTagDataConsts, DownloadButtonTagService, FileImageTagService, TextTagHtmlMarkupTagService } from "../tag-services";
import { ExternalVideoTagService } from "../tag-services/ExternalVideoTagService";
import { HtmlRawTagService } from "../tag-services/HtmlRawTagService";

export class BodyTagsExtensions {

  public static tagServices: { [id: string]: IMarkUpTagService; } = {
    ["text"]: new TextTagHtmlMarkupTagService("text", "T"),
    ["h1"]: new TextTagHtmlMarkupTagService("h1", "H1"),
    ["h2"]: new TextTagHtmlMarkupTagService("h2", "H2"),
    ["h3"]: new TextTagHtmlMarkupTagService("h3", "H3"),
    ["h4"]: new TextTagHtmlMarkupTagService("h4", "H4"),
    ["h5"]: new TextTagHtmlMarkupTagService("h5", "H5"),
    ["h6"]: new TextTagHtmlMarkupTagService("h6", "H6"),
    [FileImageTagDataConsts.TagName]: new FileImageTagService(),
    [ExternalVideoTagDataConsts.TagName]: new ExternalVideoTagService(),
    [HtmlRawTagDataConsts.TagName]: new HtmlRawTagService(),
    [DownloadButtonTagDataConsts.TagName]: new DownloadButtonTagService()
  }

  static getDescription(tagName: string) {
    var descriptions = {   
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

    if (bodyTag.tagDescription.tag === ButtonTagDataConsts.TagName) {
      return `<${bodyTag.tagDescription.tag} text="${bodyTag.attributes[ButtonTagDataConsts.TextAttrName]}" type="${bodyTag.attributes[ButtonTagDataConsts.TypeAttrName]}"  click="${bodyTag.attributes[ButtonTagDataConsts.ClickAttrName]}"></${bodyTag.tagDescription.tag}>`
    }

    if (bodyTag.tagDescription.tag === CustomWidgetTagDataConsts.TagName) {
      return `<${bodyTag.tagDescription.tag} type="${bodyTag.attributes[CustomWidgetTagDataConsts.TypeAttrName]}" data-id="${bodyTag.attributes[CustomWidgetTagDataConsts.DataIdAttrName]}"  widget-id="${bodyTag.attributes[CustomWidgetTagDataConsts.WidgetIdAttrName]}"></${bodyTag.tagDescription.tag}>`
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
