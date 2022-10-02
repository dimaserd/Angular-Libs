export class ExternalVideoTagDataConsts {
    static TagName = "external-video";
    static VideoTypeAttrName = "type";
    static LinkAttrName = "link";
}

export class ExternalVideoSupportedTypes{
    static Youtube = "youtube"
}

export interface ExternalVideoTag{
    type: string;
    data: ExternalVideoTagData;
}

export interface ExternalVideoTagData{
    type: string;
    link: string;
}

export class VideoMethods {
    static ExtractExternalVideoTag(elem: HTMLElement): ExternalVideoTag{
        return {
            type: ExternalVideoTagDataConsts.TagName,
            data:{
                type: elem.getAttribute(ExternalVideoTagDataConsts.VideoTypeAttrName),
                link: elem.getAttribute(ExternalVideoTagDataConsts.LinkAttrName)
            }
        };
    }
}
