import { CrocoHtmlOptions } from "./HtmlExtractionMethods";

export class FileImageTagDataConsts {
    static TagName = "file-image";
    static FileIdAttrName = "file-id";
    static ScreenMediaRequest = " screen-media-request";
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
}
