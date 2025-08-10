export class DownloadButtonTagDataConsts {
  static TagName = "download-file-button";
  static TitleAttrName = "title";
  static LinkAttrName = "link";
}

export interface DownloadButtonTag {
  type: string;
  data: DownloadButtonTagData;
}


export interface DownloadButtonTagData {
  title: string;
  link: string;
}

export class DownloadButtonMethods {
  static ExtractDownloadButtonTag(elem: HTMLElement): DownloadButtonTag {
    return {
      type: DownloadButtonTagDataConsts.TagName,
      data: {
        title: elem.getAttribute(DownloadButtonTagDataConsts.TitleAttrName),
        link: elem.getAttribute(DownloadButtonTagDataConsts.LinkAttrName)
      }
    };
  }
}
