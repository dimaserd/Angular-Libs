export class CustomButtonTagDataConsts {
  static TagName = "custom-button";
  static TextAttrName = "text";
  static TypeAttrName = "type";
  static ClickAttrName = "click";
}

export interface  CustomButtonTag {
  type: string;
  data: CustomButtonTagData;
}


export interface CustomButtonTagData {
  text: string;
  type: string;
  click: string;
}

export class CustomButtonMethods {
  static ExtractDownloadButtonTag(elem: HTMLElement): CustomButtonTag{
    return {
      type: CustomButtonTagDataConsts.TagName,
      data:{
        text: elem.getAttribute(CustomButtonTagDataConsts.TextAttrName),
        type: elem.getAttribute(CustomButtonTagDataConsts.TypeAttrName),
        click: elem.getAttribute(CustomButtonTagDataConsts.ClickAttrName)
      }
    };
  }
}
