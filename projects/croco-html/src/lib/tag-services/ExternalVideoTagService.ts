import { ExternalVideoTagDataConsts, ExternalVideoSupportedTypes, VideoMethods } from "../extensions";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "./IMarkUpTagService";

export class ExternalVideoTagService implements IMarkUpTagService {
  tagName: string = ExternalVideoTagDataConsts.TagName;
  shortDescription: string = "Видео";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    let useResponsiveWrapperAttr = '';

    if (bodyTag.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName] === ExternalVideoSupportedTypes.Code) {
      useResponsiveWrapperAttr = `${ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName}="${bodyTag.attributes[ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName] || false}"`;
    }

    return `<${bodyTag.tagDescription.tag} ${useResponsiveWrapperAttr} type="${bodyTag.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName]}" link="${bodyTag.attributes[ExternalVideoTagDataConsts.LinkAttrName]}">${bodyTag.innerHtml}</${bodyTag.tagDescription.tag}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return VideoMethods.ExtractExternalVideoTag(elem);
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let fileData = data.data as ExternalVideoTagDataConsts;

    return {
      presentOrEdit: true,
      tagDescription: {
        tag: data.type,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: fileData,
      innerHtml: ""
    };
  }
}
