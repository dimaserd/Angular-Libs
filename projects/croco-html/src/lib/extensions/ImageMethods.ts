import { ImageRestrictions, IImageMediaRequest } from "../models";
import { CrocoHtmlOptions } from "../options";

export class FileImageTagDataConsts {
  static readonly TagName = "file-image";
  static readonly FileIdAttrName = "file-id";
  static readonly ScreenMediaRequest = "screen-media-request";

  static readonly MaxScreenWidth = 'max-screen-width';
  static readonly MinScreenWidth = 'min-screen-width';
  static readonly MaxImageHeight = 'max-image-height';
  static readonly MaxImageWidth = 'max-image-width';

  static readonly DefaultValueForFileImage = "max-screen-width:1200,min-screen-width:900,max-image-height:300;max-screen-width:900,min-screen-width:600,max-image-height:200";
}

export class ImageMethods {

  public static buildUrl(fileId: string, sizeType: string, options: CrocoHtmlOptions): string {

    if (fileId === null || fileId === undefined) {
      return null;
    }

    const format = ImageMethods.isPrivateFileId(fileId)
      ? options.imageOptions.publicImageResizedUrlFormat
      : options.imageOptions.privateImageResizedUrlFormat;

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

    return data.split(';').reduce((requests: IImageMediaRequest[], currentValue: string) => {

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

  public static mediaRequestsArrayToString(data: IImageMediaRequest[]) {
    if (!data.length) {
      return ''
    }

    return data.map(el => ImageMethods.mediaRequestToString(el)).join(';')
  }

  public static mediaRequestToString(data: IImageMediaRequest) {
    let result = `${FileImageTagDataConsts.MaxScreenWidth}:${data.maxScreenWidth},${FileImageTagDataConsts.MinScreenWidth}:${data.minScreenWidth}`;

    if (data.maxImageHeight) {
      result += `,${FileImageTagDataConsts.MaxImageHeight}:${data.maxImageHeight}`;
    }

    if (data.maxImageWidth) {
      result += `,${FileImageTagDataConsts.MaxImageWidth}:${data.maxImageWidth}`;
    }

    return result;
  }

  public static getImageRestrictionsByScreenSize(screenSize: number, requests: IImageMediaRequest[]): ImageRestrictions {
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
