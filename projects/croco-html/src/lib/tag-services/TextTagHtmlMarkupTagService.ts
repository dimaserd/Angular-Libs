import { TextSimpleMethods, SimpleTextTagData, BodyTagsExtensions } from "../extensions";
import { InterfaceBlock } from "../models/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "../tag-services/IMarkUpTagService";

export enum TextAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export class TextTagDataConsts {
  static readonly HAlign = "h-align";
}

export class TextTagHtmlMarkupTagService implements IMarkUpTagService {

  constructor(tagName: string, shortDescription: string) {
    this.tagName = tagName;
    this.shortDescription = shortDescription;
  }

  tagName: string = "text";
  shortDescription: string = "T";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName} h-align="${bodyTag.attributes[TextTagDataConsts.HAlign]}">${bodyTag.innerHtml}</${this.tagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return TextSimpleMethods.ExtractTextTag(elem);
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let textTagData = data.data as SimpleTextTagData;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: { [TextTagDataConsts.HAlign]: textTagData.horizontalAlignment },
      innerHtml: BodyTagsExtensions.sanitizeInnerHtml(textTagData.html)
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
        [TextTagDataConsts.HAlign]: TextAlignment.Left
      },
      presentOrEdit: false,
      innerHtml: "",
    }
  }
}
