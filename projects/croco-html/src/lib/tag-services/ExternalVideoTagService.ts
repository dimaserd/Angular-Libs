import { ExternalVideoTagDataConsts, ExternalVideoSupportedTypes } from "../extensions";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

const defaultLinkYouTube = "https://www.youtube.com/embed/4CtSAnJDfsI?si=scyBNJa0Hs2t5aLE";
const defaultLinkVk = "https://vk.com/video_ext.php?oid=-22822305&id=456241864&hd=2";

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
    return {
      tagName: ExternalVideoTagDataConsts.TagName,
      data: {
        type: elem.getAttribute(ExternalVideoTagDataConsts.VideoTypeAttrName),
        link: elem.getAttribute(ExternalVideoTagDataConsts.LinkAttrName),
        useResponsiveWrapper: elem.getAttribute(ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName) !== 'false',
        innerHtml: elem.innerHTML
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let fileData = data.data as ExternalVideoTagDataConsts;

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

    let attrs = {
    };

    let innerHtml = "";

    attrs[ExternalVideoTagDataConsts.VideoTypeAttrName] = props.selectedVideoPlayer;
    attrs[ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName] = false;
    attrs[ExternalVideoTagDataConsts.LinkAttrName] = props.selectedVideoPlayer === ExternalVideoSupportedTypes.Code ? '' :
      props.selectedVideoPlayer === ExternalVideoSupportedTypes.VkVideo
        ? defaultLinkVk
        : defaultLinkYouTube;

    if (props.selectedVideoPlayer === ExternalVideoSupportedTypes.Code) {
      innerHtml = props.htmlRaw;
    }

    return {
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: attrs,
      presentOrEdit: false,
      innerHtml: "",
    };
  }
}
