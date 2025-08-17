import { HtmlBodyTag } from "../models/models";
import { HtmlExtractionMethods } from "./HtmlExtractionMethods";
import { InterfaceBlock } from "../models/InterfaceBlock";
import { FileImageTagDataConsts } from "./ImageMethods";
import { Tags } from "./Tags";
import { ExternalVideoTagDataConsts } from "./VideoMethods";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "../tag-services/IMarkUpTagService";
import { DownloadButtonTagDataConsts, DownloadButtonTagService, FileImageTagService, TextTagHtmlMarkupTagService } from "../tag-services";
import { ExternalVideoTagService } from "../tag-services/ExternalVideoTagService";
import { HtmlRawTagDataConsts, HtmlRawTagService } from "../tag-services/HtmlRawTagService";
import { ButtonTagDataConsts, ButtonTagService } from "../tag-services/ButtonTagService";
import { TextTags } from "./TextMethods";
import { TableTypes } from "./TableMethods";
import { TableTagService } from "../tag-services/TableTagService";

export class BodyTagsExtensions {

  private static readonly _tagServices: { [id: string]: IMarkUpTagService; } = {
    [TextTags.text]: new TextTagHtmlMarkupTagService("text", "T"),
    [TextTags.h1]: new TextTagHtmlMarkupTagService("h1", "H1"),
    [TextTags.h2]: new TextTagHtmlMarkupTagService("h2", "H2"),
    [TextTags.h3]: new TextTagHtmlMarkupTagService("h3", "H3"),
    [TextTags.h4]: new TextTagHtmlMarkupTagService("h4", "H4"),
    [TextTags.h5]: new TextTagHtmlMarkupTagService("h5", "H5"),
    [TextTags.h6]: new TextTagHtmlMarkupTagService("h6", "H6"),
    [FileImageTagDataConsts.TagName]: new FileImageTagService(),
    [ExternalVideoTagDataConsts.TagName]: new ExternalVideoTagService(),
    [HtmlRawTagDataConsts.TagName]: new HtmlRawTagService(),
    [DownloadButtonTagDataConsts.TagName]: new DownloadButtonTagService(),
    [ButtonTagDataConsts.TagName]: new ButtonTagService(),
    [TableTypes.Table]: new TableTagService()
  }

  public static hasTagService(tagName: string, options: CrocoHtmlOptions) {
    if (this._tagServices.hasOwnProperty(tagName)) {
      return true;
    }

    if (options.definedCustomTags.hasOwnProperty(tagName)){
      return true;
    }

    return false;
  }

  public static getTagService(tagName: string, options: CrocoHtmlOptions) {
    if (this._tagServices.hasOwnProperty(tagName)) {
      return this._tagServices[tagName];
    }

    return options.definedCustomTags[tagName];
  }

  static convertToHtmlString(bodyTag: HtmlBodyTag, options: CrocoHtmlOptions): string {
    const tagName = bodyTag.tagDescription.tag.toLowerCase();

    if (this.hasTagService(tagName, options)) {
      return this.getTagService(tagName, options).bodyTagToHtmlStringConverter(bodyTag);
    }

    return `<mapper-not-found>"${tagName}" тег не найден.</mapper-not-found>`;
  }

  static bodyTagsToHtml(bodyTags: HtmlBodyTag[], options: CrocoHtmlOptions): string {
    let htmls = bodyTags.map(bodyTag => (BodyTagsExtensions.convertToHtmlString(bodyTag, options)));

    let result = "";

    for (let index = 0; index < htmls.length; index++) {
      const element = htmls[index];

      result += element;
    }

    return result;
  }

  static getBodyTags(html: string, options: CrocoHtmlOptions) {
    let result = HtmlExtractionMethods.transformHtmlStringToBlocks(html, options);
    
    return result.map(x => BodyTagsExtensions.toBodyTag(x, options));
  }

  static sanitizeInnerHtml(html: string): string {
    return html.trim().replace('\n\t', '');
  }

  static toBodyTag(data: InterfaceBlock, options: CrocoHtmlOptions): HtmlBodyTag {

    const tagName = data.tagName;

    if (this.hasTagService(tagName, options)) {
      return this.getTagService(tagName, options).toBodyTag(data);
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
