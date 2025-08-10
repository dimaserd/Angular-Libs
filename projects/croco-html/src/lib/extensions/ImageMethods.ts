import { FileImageTag, ImageRestrictions, IMediaRequest } from "../models";
import { CrocoHtmlOptions } from "../options";

export class FileImageTagDataConsts {
  static TagName = "file-image";
  static FileIdAttrName = "file-id";
  static ScreenMediaRequest = "screen-media-request";

  static MaxScreenWidth = 'max-screen-width';
  static MinScreenWidth = 'min-screen-width';
  static MaxImageHeight = 'max-image-height';
  static MaxImageWidth = 'max-image-width';

  static DefaultValueForFileImage = "max-screen-width:1200,min-screen-width:900,max-image-height:300;max-screen-width:900,min-screen-width:600,max-image-height:200";
}

export class ImageMethods {

  public static buildUrl(fileId: string, sizeType: string, options: CrocoHtmlOptions): string {

    if (fileId === null || fileId === undefined) {
      return null;
    }

    const format = ImageMethods.isPrivateFileId(fileId)
      ? options.publicImageResizedUrlFormat
      : options.privateImageResizedUrlFormat;

    return format
      .replace("{sizeType}", sizeType)
      .replace("{fileId}", fileId);
  }

  public static buildSmallUrl(fileId: string, options: CrocoHtmlOptions): string {
    return ImageMethods.buildUrl(fileId, "Small", options);
  }

  public static buildMediumUrl(fileId: string, options: CrocoHtmlOptions): string {
    return ImageMethods.buildUrl(fileId, "Medium", options);
  }

  public static isPrivateFileId(fileId: string): boolean {
    return !isNaN(Number(fileId));
  }

  public static mediaRequestStringToArrayParser = (data: string) => {
    if (!data) {
      return [];
    }

    if (!data.length) {
      return []
    }

    return data.split(';').reduce((requests: IMediaRequest[], currentValue: string) => {

      const attrs = currentValue.split(',');

      requests.push({
        maxScreenWidth: ImageMethods.createMediaRequestValue(attrs, FileImageTagDataConsts.MaxScreenWidth),
        minScreenWidth: ImageMethods.createMediaRequestValue(attrs, FileImageTagDataConsts.MinScreenWidth),
        maxImageHeight: ImageMethods.createMediaRequestValue(attrs, FileImageTagDataConsts.MaxImageHeight),
        maxImageWidth: ImageMethods.createMediaRequestValue(attrs, FileImageTagDataConsts.MaxImageHeight)
      });

      return requests;
    }, [])
  }

  public static createMediaRequestValue(arr: string[], attribute: string): number | null {
    let elem = arr.find(el => el.includes(attribute));

    if (!elem) {
      return null;
    }

    return +elem.match(/\d+/g).join('');
  }

  public static mediaRequestsArrayToString(data: IMediaRequest[]) {
    if (!data.length) {
      return ''
    }

    return data.map(el => ImageMethods.mediaRequestToString(el)).join(';')
  }

  public static mediaRequestToString(data: IMediaRequest) {
    let result = `${FileImageTagDataConsts.MaxScreenWidth}:${data.maxScreenWidth},${FileImageTagDataConsts.MinScreenWidth}:${data.minScreenWidth}`;

    if (data.maxImageHeight) {
      result += `,${FileImageTagDataConsts.MaxImageHeight}:${data.maxImageHeight}`;
    }

    if (data.maxImageWidth) {
      result += `,${FileImageTagDataConsts.MaxImageWidth}:${data.maxImageWidth}`;
    }

    return result;
  }

  public static getImageRestrictionsByScreenSize(screenSize: number, requests: IMediaRequest[]): ImageRestrictions {
    let result = requests
      .sort((a, b) => b.maxScreenWidth - a.maxScreenWidth)
      .find(el => screenSize <= +el.maxScreenWidth && screenSize >= +el.minScreenWidth);

    if (!result) {
      return {
        maxWidth: null,
        maxHeight: null,
      };
    }

    return {
      maxHeight: result.maxImageHeight,
      maxWidth: result.maxImageWidth
    };
  }
}
