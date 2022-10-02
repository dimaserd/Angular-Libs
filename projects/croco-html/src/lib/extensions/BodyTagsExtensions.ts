import { HtmlBodyTag } from "../models/models";
import { HtmlExtractionMethods } from "./HtmlExtractionMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { HtmlRawTagDataConsts } from "./HtmlRawTagDataConsts";
import { FileImageTagData, FileImageTagDataConsts } from "./ImageMethods";
import { TextMethods } from "./TextMethods";
import { SimpleTextTagData } from "./TextSimpleMethods";
import { ExternalVideoTagDataConsts } from "./VideoMethods";

export class BodyTagsExtensions {

    static getDescription(tagName: string){
        var descriptions = {
            "text": "Текст",
            "h1": "Заголовок 1 уровня",
            "h2": "Заголовок 2 уровня",
            "h3": "Заголовок 3 уровня",
            "h4": "Заголовок 4 уровня",
            "h5": "Заголовок 5 уровня",
            "h6": "Заголовок 6 уровня",
            [FileImageTagDataConsts.TagName]: "Изображение",
            [ExternalVideoTagDataConsts.TagName]: "Внешнее видео YouTube",
            [HtmlRawTagDataConsts.TagName]: "Html разметка"
        };

        return descriptions[tagName];
    }

    static toHtml(bodyTags: HtmlBodyTag[]): string{
        let htmls = bodyTags.map(x => {
            if(TextMethods.textTags.includes(x.tagDescription.tag)){
              return `<${x.tagDescription.tag} h-align="${x.attributes['h-align']}">${x.innerHtml}</${x.tagDescription.tag}>`;
            }

            if(x.tagDescription.tag === ExternalVideoTagDataConsts.TagName){
                return `<${x.tagDescription.tag} type="${x.attributes['type']}" link="${x.attributes['link']}">${x.innerHtml}</${x.tagDescription.tag}>`
            }

            if(x.tagDescription.tag === "html-raw"){
                return `<${x.tagDescription.tag}>${x.innerHtml}</${x.tagDescription.tag}>`
            }

            return BodyTagsExtensions.imageTagToHtml(x);
          });

          let result = "";

          for (let index = 0; index < htmls.length; index++) {
            const element = htmls[index];

            result += element;
          }

          return result;
    }

    static imageTagToHtml(imageTag: HtmlBodyTag){

        var attrStr = "";

        var attrValue = imageTag.attributes[FileImageTagDataConsts.FileIdAttrName];
        if(imageTag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && attrValue){
            attrStr = `${FileImageTagDataConsts.FileIdAttrName}="${attrValue}"`;
        }

        return `<${FileImageTagDataConsts.TagName} ${attrStr}></${FileImageTagDataConsts.TagName}>`;
    }

    static getBodyTags(html:string){
        let result = HtmlExtractionMethods.transformHtmlStringToBlocks(html);
        return result.map(x => BodyTagsExtensions.toBodyTag(x));
    }

    static sanitizeInnerHtml(html:string):string{
        return html.trim().replace('\n\t', '');
    }

    static toBodyTag(data: InterfaceBlock): HtmlBodyTag {
        if (TextMethods.textTags.includes(data.type)) {
            let textTagData = data.data as SimpleTextTagData;

            return {
                presentOrEdit: true,
                tagDescription: {
                    tag: textTagData.textTagName,
                    displayValue: BodyTagsExtensions.getDescription(data.type)
                },
                attributes: { "h-align": textTagData.horizontalAlignment },
                innerHtml: BodyTagsExtensions.sanitizeInnerHtml(textTagData.html)
            };
        }

        if(data.type === FileImageTagDataConsts.TagName){

            let fileData = data.data as FileImageTagData;

            let atts = {};

            if(fileData.fileId){
                atts[FileImageTagDataConsts.FileIdAttrName] = fileData.fileId;
            }

            return {
                presentOrEdit: true,
                tagDescription: {
                    tag: FileImageTagDataConsts.TagName,
                    displayValue: BodyTagsExtensions.getDescription(data.type)
                },
                attributes: atts,
                innerHtml: ""
            };
        }

        if(data.type === ExternalVideoTagDataConsts.TagName){
            let fileData = data.data as ExternalVideoTagDataConsts;

            return {
                presentOrEdit: true,
                tagDescription: {
                    tag: ExternalVideoTagDataConsts.TagName,
                    displayValue: BodyTagsExtensions.getDescription(data.type)
                },
                attributes: fileData,
                innerHtml: ""
            };
        }

        if(data.type === HtmlRawTagDataConsts.TagName){

            return {
                presentOrEdit: true,
                tagDescription: {
                    tag: HtmlRawTagDataConsts.TagName,
                    displayValue: BodyTagsExtensions.getDescription(data.type)
                },
                attributes: {},
                innerHtml: BodyTagsExtensions.sanitizeInnerHtml(data.data["innerHTML"])
            };
        }

        return {
            presentOrEdit: true,
            tagDescription: {
                tag: "unsupported-tag",
                displayValue: "Неподдерживаемый тег"
            },
            attributes: { },
            innerHtml: JSON.stringify(data)
        };
    }
}
