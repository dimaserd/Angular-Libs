export class ButtonTagDataConsts {
  static TagName = "button";
  static TextAttrName = "text";
  static TypeAttrName = "type";
  static ClickAttrName = "click";
}

export interface ButtonTag {
  type: string;
  data: ButtonTagData;
}


export interface ButtonTagData {
  text: string;
  type: string;
  click: string;
}

export class ButtonMethods {
  static ExtractButtonTag(elem: HTMLElement): ButtonTag{
    return {
      type: ButtonTagDataConsts.TagName,
      data:{
        text: elem.getAttribute(ButtonTagDataConsts.TextAttrName),
        type: elem.getAttribute(ButtonTagDataConsts.TypeAttrName),
        click: elem.getAttribute(ButtonTagDataConsts.ClickAttrName)
      }
    };
  }
}
