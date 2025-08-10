import { FileImageTagDataConsts, ImageMethods } from "./ImageMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { TableMethods, TableTypes } from "./TableMethods";
import {
  ExternalVideoTagDataConsts,
  VideoMethods
} from "./VideoMethods";
import { DownloadButtonMethods, DownloadButtonTagDataConsts } from "./DownloadButtonMethods";
import { ButtonMethods, ButtonTagDataConsts } from "./ButtonMethods";
import { CrocoHtmlOptions } from "../options";
import { CustomWidgetMethods, CustomWidgetTagDataConsts } from "./CustomWidgetMethods";
import { ExtractHtmlRawTagMethods, HtmlRawTagDataConsts } from "./HtmlRawTagDataConsts";
import { BodyTagsExtensions } from "./BodyTagsExtensions";

export class HtmlExtractionMethods {


  // TODO удалить в пользу BodyTagsExtensions
  static Extractors = {
    
    ["text"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["text"].extractBlockFromHtmlElement(elem, options),
    ["h1"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h1"].extractBlockFromHtmlElement(elem, options),
    ["h2"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h2"].extractBlockFromHtmlElement(elem, options),
    ["h3"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h3"].extractBlockFromHtmlElement(elem, options),
    ["h4"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h4"].extractBlockFromHtmlElement(elem, options),
    ["h5"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h5"].extractBlockFromHtmlElement(elem, options),
    ["h6"]: (elem: HTMLElement, options: CrocoHtmlOptions) => BodyTagsExtensions.tagServices["h6"].extractBlockFromHtmlElement(elem, options),
    

    [FileImageTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => ImageMethods.ExtractImage(elem, options),
    [TableTypes.Table]: (elem: HTMLElement, options: CrocoHtmlOptions) => TableMethods.getTableFromHtmlTag(elem as HTMLTableElement, options),

    [ExternalVideoTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => VideoMethods.ExtractExternalVideoTag(elem),
    [DownloadButtonTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => DownloadButtonMethods.ExtractDownloadButtonTag(elem),
    [ButtonTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => ButtonMethods.ExtractButtonTag(elem),
    [CustomWidgetTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => CustomWidgetMethods.ExtractCustomWidgetTag(elem),
    [HtmlRawTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => ExtractHtmlRawTagMethods.ExtractHtmlRawTag(elem)
  };

  static transformHtmlElementToBlocks(element: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock[] {
    var data: InterfaceBlock[] = [];

    for (let i = 0; i < element.children.length; i++) {
      var elem = element.children.item(i) as HTMLElement;


      var loweredTagName = elem.tagName.toLowerCase();

      if (!HtmlExtractionMethods.Extractors.hasOwnProperty(loweredTagName)) {
        data.push({
          type: "unsupported-tag",
          data: {
            tagString: elem.outerHTML
          }
        });
      }
      else {
        var extractor = HtmlExtractionMethods.Extractors[loweredTagName];
        var result = extractor(elem, options);
        data.push(result);
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
