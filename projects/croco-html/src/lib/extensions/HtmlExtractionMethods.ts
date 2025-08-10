import { InterfaceBlock } from "./InterfaceBlock";
import { TableMethods, TableTypes } from "./TableMethods";
import { ButtonMethods, ButtonTagDataConsts } from "./ButtonMethods";
import { CrocoHtmlOptions } from "../options";
import { CustomWidgetMethods, CustomWidgetTagDataConsts } from "./CustomWidgetMethods";
import { BodyTagsExtensions } from "./BodyTagsExtensions";

export class HtmlExtractionMethods {

  // TODO удалить в пользу BodyTagsExtensions
  static Extractors = {
    [TableTypes.Table]: (elem: HTMLElement, options: CrocoHtmlOptions) => TableMethods.getTableFromHtmlTag(elem as HTMLTableElement, options),
    [ButtonTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => ButtonMethods.ExtractButtonTag(elem),
    [CustomWidgetTagDataConsts.TagName]: (elem: HTMLElement, options: CrocoHtmlOptions) => CustomWidgetMethods.ExtractCustomWidgetTag(elem),
  };

  static transformHtmlElementToBlocks(element: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock[] {
    var data: InterfaceBlock[] = [];

    for (let i = 0; i < element.children.length; i++) {
      
      var elem = element.children.item(i) as HTMLElement;
      var loweredTagName = elem.tagName.toLowerCase();

      if (BodyTagsExtensions.tagServices.hasOwnProperty(loweredTagName)){
        var tagService = BodyTagsExtensions.tagServices[loweredTagName];

        var resultBlock = tagService.extractBlockFromHtmlElement(elem, options);
        data.push(resultBlock);
        
        continue;
      }

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
