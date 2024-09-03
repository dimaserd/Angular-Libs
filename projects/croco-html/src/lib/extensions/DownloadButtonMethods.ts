import {ExternalVideoTagDataConsts} from "./VideoMethods";

export class DownloadButtonTagDataConsts {
  static TagName = "download-button";
}

export interface  DownloadButtonTag {
  type: string;
  data: DownloadButtonTagData;
}


export interface DownloadButtonTagData {
  title: string;
  link: string;
}

export class DownloadButtonMethods {
  static ExtractDownloadButtonTag(elem: HTMLElement): DownloadButtonTag{
    return {
      type: DownloadButtonTagDataConsts.TagName,
      data:{
        title: elem.innerHTML,
        link: elem.getAttribute(ExternalVideoTagDataConsts.LinkAttrName)
      }
    };
  }
}
