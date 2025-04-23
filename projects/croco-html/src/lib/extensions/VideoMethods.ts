export class ExternalVideoTagDataConsts {
  static TagName = "external-video";
  static VideoTypeAttrName = "type";
  static LinkAttrName = "link";
  static UseResponsiveWrapperAttrName = "use-responsive-wrapper";
  static IframeAttrName = "iframe";
}

export class ExternalVideoSupportedTypes {
  static Youtube = "youtube"
  static VkVideo = "vk-video"
  static Code = "code"
}

export const ExternalVideoPlayers = [
  {
    type: ExternalVideoSupportedTypes.Code,
    displayValue: 'Встраиваемое Видео',
  },
  {
    type: ExternalVideoSupportedTypes.Youtube,
    displayValue: 'Youtube',
  },
  {
    type: ExternalVideoSupportedTypes.VkVideo,
    displayValue: 'Vk Video',
  }
]

export interface ExternalVideoTag {
  type: string;
  data: ExternalVideoTagData;
}

export interface ExternalVideoTagData {
  type: string;
  link: string;
  innerHtml: string;
  useResponsiveWrapper: boolean;
}

export class VideoMethods {
    static ExtractExternalVideoTag(elem: HTMLElement): ExternalVideoTag {
        return {
            type: ExternalVideoTagDataConsts.TagName,
            data:{
                type: elem.getAttribute(ExternalVideoTagDataConsts.VideoTypeAttrName),
                link: elem.getAttribute(ExternalVideoTagDataConsts.LinkAttrName),
                useResponsiveWrapper: elem.getAttribute(ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName) !== 'false' ,
                innerHtml: elem.innerHTML
            }
        };
    }
}
