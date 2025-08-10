import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

export class CustomWidgetTagDataConsts {
  static readonly TagName = "custom-widget";

  static readonly TypeAttrName = "type";
  static readonly DataIdAttrName = "data-id";
  static readonly WidgetIdAttrName = "widget-id";
}

export interface CustomWidgetTag {
  type: string;
  data: CustomWidgetTagData;
}

export interface CustomWidgetTagData {
  type: string;
  dataId: string;
  widgetId: string;
}


export class CustomWidgetTagService implements IMarkUpTagService {
  tagName: string = CustomWidgetTagDataConsts.TagName;
  shortDescription: string = "Виджет";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {

    let attrs = bodyTag.attributes;

    return `<${this.tagName} type="${attrs[CustomWidgetTagDataConsts.TypeAttrName]}" data-id="${attrs[CustomWidgetTagDataConsts.DataIdAttrName]}"  widget-id="${attrs[CustomWidgetTagDataConsts.WidgetIdAttrName]}"></${this.tagName}>`
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return {
      type: CustomWidgetTagDataConsts.TagName,
      data: {
        type: elem.getAttribute(CustomWidgetTagDataConsts.TypeAttrName),
        dataId: elem.getAttribute(CustomWidgetTagDataConsts.DataIdAttrName),
        widgetId: elem.getAttribute(CustomWidgetTagDataConsts.WidgetIdAttrName)
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let customWidgetTagData = data.data as CustomWidgetTagData;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: data.type,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: customWidgetTagData,
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
        [CustomWidgetTagDataConsts.TypeAttrName]: 'example-type',
        [CustomWidgetTagDataConsts.DataIdAttrName]: 'example-data-id',
        [CustomWidgetTagDataConsts.WidgetIdAttrName]: 'example-widget-id'
      },
      presentOrEdit: false,
      innerHtml: props.htmlRaw,
    };
  }

  static ExtractCustomWidgetTagData(attributes: any): CustomWidgetTagData {
    return {
      type: attributes[CustomWidgetTagDataConsts.TypeAttrName],
      dataId: attributes[CustomWidgetTagDataConsts.DataIdAttrName],
      widgetId: attributes[CustomWidgetTagDataConsts.WidgetIdAttrName]
    }
  }

  static ExtractCustomWidgetAttributes(customWidgetTagData: CustomWidgetTagData) {
    return {
      [CustomWidgetTagDataConsts.TypeAttrName]: customWidgetTagData.type,
      [CustomWidgetTagDataConsts.DataIdAttrName]: customWidgetTagData.dataId,
      [CustomWidgetTagDataConsts.WidgetIdAttrName]: customWidgetTagData.widgetId
    }
  }
}
