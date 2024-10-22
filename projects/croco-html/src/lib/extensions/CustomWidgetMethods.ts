export class CustomWidgetTagDataConsts {
  static TagName = "custom-widget";

  static TypeAttrName = "type";
  static DataIdAttrName = "data-id";
  static WidgetIdAttrName = "widget-id";
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
