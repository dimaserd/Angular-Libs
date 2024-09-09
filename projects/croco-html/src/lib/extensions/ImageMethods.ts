import { CrocoHtmlOptions } from "./HtmlExtractionMethods";

export class FileImageTagDataConsts {
    static TagName = "file-image";
    static FileIdAttrName = "file-id";
    static ScreenMediaRequest = "screen-media-request";
    static DefaultValueForFileImage = "screen-width:1200,max-image-height:300;screen-width:900,max-image-height:200";
    static ScreenWidth = 'screen-width';
    static MaxImageHeight = 'max-image-height';
}

export interface FileImageTag {
    type: string;
    data: FileImageTagData;
}

export interface FileImageTagData {
    src: string;
    fileId: number;
    screenMediaRequest: string;
}

export interface IMediaRequest {
  screenWidth: number,
  maxImageHeight: number,
}

export class ImageMethods {

    public static buildUrl(fileId: number, sizeType: string, options: CrocoHtmlOptions): string {

        if (fileId === null || fileId === undefined) {
            return null;
        }

        return options.publicImageResizedUrlFormat
            .replace("{sizeType}", sizeType)
            .replace("{fileId}", fileId.toString());
    }

    public static buildSmallUrl(fileId: number, options: CrocoHtmlOptions): string {
        return ImageMethods.buildUrl(fileId, "Small", options);
    }

    public static buildMediumUrl(fileId: number, options: CrocoHtmlOptions): string {
        return ImageMethods.buildUrl(fileId, "Medium", options);
    }

    public static ExtractImage(elem: HTMLElement, options: CrocoHtmlOptions): FileImageTag {
        let fileId = +elem.getAttribute(FileImageTagDataConsts.FileIdAttrName);
        let src = ImageMethods.buildMediumUrl(fileId, options);
        return {
            type: FileImageTagDataConsts.TagName,
            data: {
                src,
                fileId: fileId,
                screenMediaRequest: elem.getAttribute(FileImageTagDataConsts.ScreenMediaRequest)
            }
        };
    }

  public static mediaRequestStringToArrayParser = (data: string) => {
    if(!data.length) {
      return []
    }

    return  data.split(';').reduce((requests: IMediaRequest[], currentValue: string ) => {
      requests.push({
        screenWidth: ImageMethods.createMediaRequestValue(currentValue.split(','), FileImageTagDataConsts.ScreenWidth ),
        maxImageHeight: ImageMethods.createMediaRequestValue(currentValue.split(','), FileImageTagDataConsts.MaxImageHeight ),
      })
      return requests
    }, [])
  }

  public static createMediaRequestValue(arr: string[], attribute: string) {
    return +arr.find(el => el.includes(attribute)).match(/\d+/g).join('');
  }

  public static mediaRequestsArrayToStringParser = (data: IMediaRequest[]) => {
    if(!data.length) {
      return ''
    }

    return data.map(el=> `${FileImageTagDataConsts.ScreenWidth}:${el.screenWidth},${FileImageTagDataConsts.MaxImageHeight}:${el.maxImageHeight}`).join(';')
  }

  public static screenSizeChanged = (screenSize: number, requests: IMediaRequest[]) => {
    let newSize = null;
    requests
      .sort((a,b) => a.screenWidth > b.screenWidth ? -1 : 1)
      .forEach((el, index) => {
      if(screenSize < +el.screenWidth) {
        newSize = el.maxImageHeight;
      }
    })
    return newSize
  }

}
