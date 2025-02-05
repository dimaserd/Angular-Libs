export class ExternalVideoTagDataConsts {
    static TagName = "external-video";
    static VideoTypeAttrName = "type";
    static LinkAttrName = "link";
    static UseResponsiveWrapper = "useResponsiveWrapper";
    static IframeAttrName = "iframe";
}

export class ExternalVideoSupportedTypes{
    static Youtube = "youtube"
    static VkVideo = "vk-video"
    static Code = "code"
}

export const ExternalVideoPlayers = [
  {
    type: ExternalVideoSupportedTypes.Youtube,
    displayValue: 'Youtube',
  },
  {
    type: ExternalVideoSupportedTypes.VkVideo,
    displayValue: 'Vk Video',
  },
  {
    type: ExternalVideoSupportedTypes.Code,
    displayValue: 'Встраиваемое Видео',
  }
]

export interface ExternalVideoTag{
    type: string;
    data: ExternalVideoTagData;
}

export interface ExternalVideoTagData{
    type: string;
    link: string;
    iframe: string;
    useResponsiveWrapper: string;
}

export class VideoMethods {
    static ExtractExternalVideoTag(elem: HTMLElement): ExternalVideoTag {
        return {
            type: ExternalVideoTagDataConsts.TagName,
            data:{
                type: elem.getAttribute(ExternalVideoTagDataConsts.VideoTypeAttrName),
                link: elem.getAttribute(ExternalVideoTagDataConsts.LinkAttrName),
                useResponsiveWrapper: elem.getAttribute(ExternalVideoTagDataConsts.UseResponsiveWrapper),
                iframe: elem.innerHTML
            }
        };
    }
}
