import { HtmlExtractionOptions } from "./HtmlExtractionMethods";

export class FileImageTagDataConsts {
    static TagName = "file-image";
    static FileIdAttrName = "file-id";
}

export interface FileImageTag{
    type: string;
    data: FileImageTagData;
}

export interface FileImageTagData{
    src: string;
    fileId: number;
}

export class ImageMethods {

    public static buildUrl(fileId: number, options: HtmlExtractionOptions):string{
        
        var baseUrl = `/FileCopies/Images/Medium/${fileId}.jpg`;

        if (!options.useCustomDomain){
            return baseUrl;
        }
        
        return `${options.domain}${baseUrl}`;
    }

    public static buildSmallUrl(fileId: number, options: HtmlExtractionOptions):string{
        var baseUrl = `/FileCopies/Images/Small/${fileId}.jpg`;

        if (!options.useCustomDomain){
            return baseUrl;
        }
        
        return `${options.domain}${baseUrl}`;
    }

    public static ExtractImage(elem: HTMLElement, options: HtmlExtractionOptions): FileImageTag {
        let fileId = +elem.getAttribute(FileImageTagDataConsts.FileIdAttrName);
        let src = ImageMethods.buildUrl(fileId, options);
        return {
            type: FileImageTagDataConsts.TagName,
            data: {
                src,
                fileId: fileId,
            }
        };
    }
}
