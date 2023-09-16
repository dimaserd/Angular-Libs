import { ImageMethods } from "./ImageMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { TableMethods } from "./TableMethods";
import { TextMethods } from "./TextMethods";
import { GenericTextTag, TextSimpleMethods } from "./TextSimpleMethods";
import { ExternalVideoTagDataConsts, VideoMethods } from "./VideoMethods";

export interface HtmlExtractionOptions{
  useCustomDomain: boolean;
  domain: string;
}

export class HtmlExtractionMethods {

  static ExtractHeaderTag(elem: HTMLElement, tagName: string): GenericTextTag {

    var data: GenericTextTag = TextSimpleMethods.ExtractTextTag(elem);
    data.type = tagName;

    return data;
  }

  static Extractors = {
    ["TEXT"]: (elem: HTMLElement, options: HtmlExtractionOptions) => TextSimpleMethods.ExtractTextTag(elem),
    ["FILE-IMAGE"]: (elem: HTMLElement, options: HtmlExtractionOptions) => ImageMethods.ExtractImage(elem, options),
    ["TABLE"]: (elem: HTMLElement, options: HtmlExtractionOptions) => TableMethods.getTableFromHtmlTag(elem as HTMLTableElement, options),
    ["RICH-TEXT"]: (elem: HTMLElement, options: HtmlExtractionOptions) => TextMethods.ExtractRichTextData(elem),
    ["HTML-RAW"]: (elem: HTMLElement, options: HtmlExtractionOptions) => ({
      type: "html-raw",
      data: {
        innerHTML: elem.innerHTML
      }
    }),
    ["H1"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h1"),
    ["H2"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h2"),
    ["H3"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h3"),
    ["H4"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h4"),
    ["H5"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h5"),
    ["H6"]: (elem: HTMLElement, options: HtmlExtractionOptions) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h6"),
    [ExternalVideoTagDataConsts.TagName.toUpperCase()]: (elem: HTMLElement, options: HtmlExtractionOptions) => VideoMethods.ExtractExternalVideoTag(elem)
  };

  static transformHtmlElementToBlocks(element: HTMLElement, options: HtmlExtractionOptions): InterfaceBlock[] {
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

  static transformHtmlStringToBlocks(value: string, options: HtmlExtractionOptions): InterfaceBlock[] {

    if (value === undefined) {
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
