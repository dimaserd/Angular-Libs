import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

export class ButtonTagDataConsts {
  static readonly TagName = "button";
  static readonly TextAttrName = "text";
  static readonly TypeAttrName = "type";
  static readonly ClickAttrName = "click";
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

export class ButtonTagService implements IMarkUpTagService {
  tagName: string = ButtonTagDataConsts.TagName;
  shortDescription: string = "Кнопка";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {

    let atts = bodyTag.attributes;

    return `<${this.tagName} text="${atts[ButtonTagDataConsts.TextAttrName]}" type="${atts[ButtonTagDataConsts.TypeAttrName]}"  click="${atts[ButtonTagDataConsts.ClickAttrName]}"></${this.tagName}>`
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return {
      tagName: ButtonTagDataConsts.TagName,
      data: {
        text: elem.getAttribute(ButtonTagDataConsts.TextAttrName),
        type: elem.getAttribute(ButtonTagDataConsts.TypeAttrName),
        click: elem.getAttribute(ButtonTagDataConsts.ClickAttrName)
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let fileData = data.data as ButtonTagDataConsts;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: data.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: fileData,
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
        [ButtonTagDataConsts.ClickAttrName]: '',
        [ButtonTagDataConsts.TypeAttrName]: 'button',
        [ButtonTagDataConsts.TextAttrName]: 'Кнопка'
      },
      presentOrEdit: false,
      innerHtml: props.htmlRaw,
    };
  }
}
