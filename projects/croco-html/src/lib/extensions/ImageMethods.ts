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

    public static buildUrl(fileId: number):string{
        return `/FileCopies/Images/Medium/${fileId}.jpg`;
    }

    public static buildSmallUrl(fileId: number):string{
        return `/FileCopies/Images/Small/${fileId}.jpg`;
    }

    public static ExtractImage(elem: HTMLElement): FileImageTag {
        let fileId = +elem.getAttribute(FileImageTagDataConsts.FileIdAttrName);
        let src = ImageMethods.buildUrl(fileId);
        return {
            type: FileImageTagDataConsts.TagName,
            data: {
                src,
                fileId: fileId,
            }
        };
    }
}
