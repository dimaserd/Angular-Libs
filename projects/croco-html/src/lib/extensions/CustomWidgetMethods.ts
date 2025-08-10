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

export class CustomWidgetMethods {

  static ExtractCustomWidgetTagData(attributes: any): CustomWidgetTagData {
    return {
      type: attributes[CustomWidgetTagDataConsts.TypeAttrName],
      dataId: attributes[CustomWidgetTagDataConsts.DataIdAttrName],
      widgetId: attributes[CustomWidgetTagDataConsts.WidgetIdAttrName]
    }
  }

  static ExtractCustomWidgetAttributes(customWidgetTagData: CustomWidgetTagData): any {
    return {
      [CustomWidgetTagDataConsts.TypeAttrName]: customWidgetTagData.type,
      [CustomWidgetTagDataConsts.DataIdAttrName]: customWidgetTagData.dataId,
      [CustomWidgetTagDataConsts.WidgetIdAttrName]: customWidgetTagData.widgetId
    }
  }

  static ExtractCustomWidgetTag(elem: HTMLElement): CustomWidgetTag {
    return {
      type: CustomWidgetTagDataConsts.TagName,
      data: {
        type: elem.getAttribute(CustomWidgetTagDataConsts.TypeAttrName),
        dataId: elem.getAttribute(CustomWidgetTagDataConsts.DataIdAttrName),
        widgetId: elem.getAttribute(CustomWidgetTagDataConsts.WidgetIdAttrName)
      }
    };
  }
}
