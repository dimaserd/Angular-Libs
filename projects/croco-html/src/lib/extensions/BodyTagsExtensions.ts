import { HtmlBodyTag } from "../models/models";
import { HtmlExtractionMethods } from "./HtmlExtractionMethods";
import { InterfaceBlock } from "./InterfaceBlock";
import { HtmlRawTagDataConsts } from "./HtmlRawTagDataConsts";
import { FileImageTagData, FileImageTagDataConsts } from "./ImageMethods";
import { TextTags } from "./TextMethods";
import { SimpleTextTagData, TextTagDataConsts } from "./TextSimpleMethods";
import { Tags } from "./Tags";
import { ExternalVideoSupportedTypes, ExternalVideoTagDataConsts, VideoMethods } from "./VideoMethods";
import { DownloadButtonTagDataConsts } from "./DownloadButtonMethods";
import { ButtonTagDataConsts } from "./ButtonMethods";
import { CrocoHtmlOptions } from "../options";
import { CustomWidgetTagData, CustomWidgetTagDataConsts } from "./CustomWidgetMethods";

export class BodyTagsExtensions {

  static getDescription(tagName: string) {
    var descriptions = {
      "text": "T",
      "h1": "H1",
      "h2": "H2",
      "h3": "H3",
      "h4": "H4",
      "h5": "H5",
      "h6": "H6",
      [FileImageTagDataConsts.TagName]: "Изображение",
      [ExternalVideoTagDataConsts.TagName]: "Видео",
      [DownloadButtonTagDataConsts.TagName]: "Кнопка",
      [HtmlRawTagDataConsts.TagName]: "Разметка",
      [DownloadButtonTagDataConsts.TagName]: "Кнопка для скачивания",
      [ButtonTagDataConsts.TagName]: "Кнопка",
      [CustomWidgetTagDataConsts.TagName]: "Виджет"
    };

    return descriptions[tagName];
  }

  static toHtml(bodyTags: HtmlBodyTag[]): string {
    let htmls = bodyTags.map(x => {
      if (TextTags.allTextTags.includes(x.tagDescription.tag)) {
        return `<${x.tagDescription.tag} h-align="${x.attributes[TextTagDataConsts.HAlign]}">${x.innerHtml}</${x.tagDescription.tag}>`;
      }

      if (x.tagDescription.tag === ExternalVideoTagDataConsts.TagName) {
        let useResponsiveWrapperAttr = '';
        if (x.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName] === ExternalVideoSupportedTypes.Code) {
          useResponsiveWrapperAttr = `${ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName}="${x.attributes[ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName] || false}"`
        }
        return `<${x.tagDescription.tag} ${useResponsiveWrapperAttr} type="${x.attributes[ExternalVideoTagDataConsts.VideoTypeAttrName]}" link="${x.attributes[ExternalVideoTagDataConsts.LinkAttrName]}">${x.innerHtml}</${x.tagDescription.tag}>`
      }

      if (x.tagDescription.tag === "html-raw") {
        return `<${x.tagDescription.tag}>${x.innerHtml}</${x.tagDescription.tag}>`
      }

      if (x.tagDescription.tag === DownloadButtonTagDataConsts.TagName) {
        return `<${x.tagDescription.tag} title="${x.attributes[DownloadButtonTagDataConsts.TitleAttrName]}" link="${x.attributes[DownloadButtonTagDataConsts.LinkAttrName]}"></${x.tagDescription.tag}>`
      }

      if (x.tagDescription.tag === ButtonTagDataConsts.TagName) {
        return `<${x.tagDescription.tag} text="${x.attributes[ButtonTagDataConsts.TextAttrName]}" type="${x.attributes[ButtonTagDataConsts.TypeAttrName]}"  click="${x.attributes[ButtonTagDataConsts.ClickAttrName]}"></${x.tagDescription.tag}>`
      }

      if (x.tagDescription.tag === CustomWidgetTagDataConsts.TagName) {
        return `<${x.tagDescription.tag} type="${x.attributes[CustomWidgetTagDataConsts.TypeAttrName]}" data-id="${x.attributes[CustomWidgetTagDataConsts.DataIdAttrName]}"  widget-id="${x.attributes[CustomWidgetTagDataConsts.WidgetIdAttrName]}"></${x.tagDescription.tag}>`
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

  static imageTagToHtml(imageTag: HtmlBodyTag) {

    let fileIdAttr = "";
    let screenMediaRequestAttr = "";

    if (imageTag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && imageTag.attributes[FileImageTagDataConsts.FileIdAttrName]) {
      fileIdAttr = `${FileImageTagDataConsts.FileIdAttrName}="${imageTag.attributes[FileImageTagDataConsts.FileIdAttrName]}"`;
    }

    if (imageTag.attributes.hasOwnProperty(FileImageTagDataConsts.ScreenMediaRequest) && imageTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]) {
      screenMediaRequestAttr = `${FileImageTagDataConsts.ScreenMediaRequest}="${imageTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]}"`;
    }

    return `<${FileImageTagDataConsts.TagName} ${fileIdAttr} ${screenMediaRequestAttr}></${FileImageTagDataConsts.TagName}>`;
  }

  static getBodyTags(html: string, options: CrocoHtmlOptions) {
    let result = HtmlExtractionMethods.transformHtmlStringToBlocks(html, options);
    return result.map(x => BodyTagsExtensions.toBodyTag(x));
  }

  static sanitizeInnerHtml(html: string): string {
    return html.trim().replace('\n\t', '');
  }

  static toBodyTag(data: InterfaceBlock): HtmlBodyTag {
    if (TextTags.allTextTags.includes(data.type)) {
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

    if (data.type === FileImageTagDataConsts.TagName) {

      let fileData = data.data as FileImageTagData;

      let attrs = {};

      if (fileData.fileId) {
        attrs[FileImageTagDataConsts.FileIdAttrName] = fileData.fileId;
      }

      if (fileData.screenMediaRequest) {
        attrs[FileImageTagDataConsts.ScreenMediaRequest] = fileData.screenMediaRequest;
      }

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: FileImageTagDataConsts.TagName,
          displayValue: BodyTagsExtensions.getDescription(data.type)
        },
        attributes: attrs,
        innerHtml: ""
      };
    }

    if (data.type === ExternalVideoTagDataConsts.TagName) {
      let fileData = data.data as ExternalVideoTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type)
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === ButtonTagDataConsts.TagName) {
      let fileData = data.data as ButtonTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type)
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === DownloadButtonTagDataConsts.TagName) {
      let fileData = data.data as ButtonTagDataConsts;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type)
        },
        attributes: fileData,
        innerHtml: ""
      };
    }

    if (data.type === CustomWidgetTagDataConsts.TagName) {
      let customWidgetTagData = data.data as CustomWidgetTagData;

      return {
        presentOrEdit: true,
        tagDescription: {
          tag: data.type,
          displayValue: BodyTagsExtensions.getDescription(data.type)
        },
        attributes: customWidgetTagData,
        innerHtml: ""
      };
    }

    if (data.type === HtmlRawTagDataConsts.TagName) {

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
        tag: Tags.UnsupportedTag,
        displayValue: "Неподдерживаемый тег"
      },
      attributes: {},
      innerHtml: JSON.stringify(data)
    };
  }
}
