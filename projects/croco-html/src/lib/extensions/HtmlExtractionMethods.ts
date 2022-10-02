import { ImageMethods } from "./ImageMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { TableMethods } from "./TableMethods";
import { TextMethods } from "./TextMethods";
import { GenericTextTag, TextSimpleMethods } from "./TextSimpleMethods";
import { ExternalVideoTagDataConsts, VideoMethods } from "./VideoMethods";

export class HtmlExtractionMethods {


  static ExtractHeaderTag(elem: HTMLElement, tagName: string): GenericTextTag {

    var data: GenericTextTag = TextSimpleMethods.ExtractTextTag(elem);
    data.type = tagName;

    return data;
  }

  static Extractors = {
    ["TEXT"]: (elem: HTMLElement) => TextSimpleMethods.ExtractTextTag(elem),
    ["FILE-IMAGE"]: (elem: HTMLElement) => ImageMethods.ExtractImage(elem),
    ["TABLE"]: (elem: HTMLElement) => TableMethods.getTableFromHtmlTag(elem as HTMLTableElement),
    ["RICH-TEXT"]: (elem: HTMLElement) => TextMethods.ExtractRichTextData(elem),
    ["HTML-RAW"]: (elem: HTMLElement) => ({
      type: "html-raw",
      data: {
        innerHTML: elem.innerHTML
      }
    }),
    ["H1"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h1"),
    ["H2"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h2"),
    ["H3"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h3"),
    ["H4"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h4"),
    ["H5"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h5"),
    ["H6"]: (elem: HTMLElement) => HtmlExtractionMethods.ExtractHeaderTag(elem, "h6"),
    [ExternalVideoTagDataConsts.TagName.toUpperCase()]: (elem: HTMLElement) => VideoMethods.ExtractExternalVideoTag(elem)
  };

  static transformHtmlElementToBlocks(element: HTMLElement): InterfaceBlock[] {
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
        var result = extractor(elem);
        data.push(result);
      }
    }

    return data;
  }

  static transformHtmlStringToBlocks(value: string): InterfaceBlock[] {

    if (value === undefined) {
      return [];
    }

    value = value
      .replace('\n', '')
      .replace('\t', '');

    var div = document.createElement("div");
    div.innerHTML = value;

    return this.transformHtmlElementToBlocks(div);
  }
}
