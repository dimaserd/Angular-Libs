export class ExternalVideoTagDataConsts {
  static readonly TagName = "external-video";
  static readonly VideoTypeAttrName = "type";
  static readonly LinkAttrName = "link";
  static readonly UseResponsiveWrapperAttrName = "use-responsive-wrapper";
  static readonly IframeAttrName = "iframe";
}

export class ExternalVideoSupportedTypes {
  static readonly Youtube = "youtube"
  static readonly VkVideo = "vk-video"
  static readonly Code = "code"
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
