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
