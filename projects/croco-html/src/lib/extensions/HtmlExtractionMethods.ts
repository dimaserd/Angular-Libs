import { ImageMethods } from "./ImageMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { TableMethods } from "./TableMethods";
import { TextMethods } from "./TextMethods";
import { GenericTextTag, TextSimpleMethods } from "./TextSimpleMethods";
import {
  ExternalVideoTagDataConsts,
  VideoMethods
} from "./VideoMethods";
import {DownloadButtonMethods, DownloadButtonTagDataConsts} from "./DownloadButtonMethods";

export interface CrocoHtmlOptions {
  publicImageResizedUrlFormat: string;
}

export class HtmlExtractionMethods {

  static ExtractHeaderTag(elem: HTMLElement, tagName: string): GenericTextTag {

    var data: GenericTextTag = TextSimpleMethods.ExtractTextTag(elem);
    data.type = tagName;

    return data;
  }

  static Extractors = {
    ["TEXT"]: (elem: HTMLElement, options: CrocoHtmlOptions) => TextSimpleMethods.ExtractTextTag(elem),
    ["FILE-IMAGE"]: (elem: HTMLElement, options: CrocoHtmlOptions) => ImageMethods.ExtractImage(elem, options),
    ["TABLE"]: (elem: HTMLElement, options: CrocoHtmlOptions) => TableMethods.getTableFromHtmlTag(elem as HTMLTableElement, options),
    ["RICH-TEXT"]: (elem: HTMLElement, options: CrocoHtmlOptions) => TextMethods.ExtractRichTextData(elem),
    ["HTML-RAW"]: (elem: HTMLElement, options: CrocoHtmlOptions) => ({
      type: "html-raw",
      data: {
        innerHTML: elem.innerHTML
      }
    }),
    ["H1"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h1"),
    ["H2"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h2"),
    ["H3"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h3"),
    ["H4"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h4"),
    ["H5"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h5"),
    ["H6"]: (elem: HTMLElement, options: CrocoHtmlOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h6"),
    [ExternalVideoTagDataConsts.TagName.toUpperCase()]: (elem: HTMLElement, options: CrocoHtmlOptions) => VideoMethods.ExtractExternalVideoTag(elem),
    [DownloadButtonTagDataConsts.TagName.toUpperCase()]: (elem: HTMLElement, options: CrocoHtmlOptions) => DownloadButtonMethods.ExtractDownloadButtonTag(elem),
  };

  static transformHtmlElementToBlocks(element: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock[] {
    var data: InterfaceBlock[] = [];

    for (let i = 0; i < element.children.length; i++) {
      var elem = element.children.item(i) as HTMLElement;

      if (!HtmlExtractionMethods.Extractors.hasOwnProperty(elem.tagName)) {
        data.push({
          type: "unsupported-tag",
          data: {
            tagString: elem.outerHTML
          }
        });
      }
      else {
        var extractor = HtmlExtractionMethods.Extractors[elem.tagName];
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
