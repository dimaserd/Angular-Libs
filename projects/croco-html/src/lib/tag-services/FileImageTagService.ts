import { FileImageTagDataConsts, ImageMethods } from "../extensions";
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag, FileImageTagData } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "../tag-services/IMarkUpTagService";

export class FileImageTagService implements IMarkUpTagService {
  tagName: string = FileImageTagDataConsts.TagName;
  shortDescription: string = "Изображение";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    let fileIdAttr = "";
    let screenMediaRequestAttr = "";

    if (bodyTag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && bodyTag.attributes[FileImageTagDataConsts.FileIdAttrName]) {
      fileIdAttr = `${FileImageTagDataConsts.FileIdAttrName}="${bodyTag.attributes[FileImageTagDataConsts.FileIdAttrName]}"`;
    }

    if (bodyTag.attributes.hasOwnProperty(FileImageTagDataConsts.ScreenMediaRequest) && bodyTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]) {
      screenMediaRequestAttr = `${FileImageTagDataConsts.ScreenMediaRequest}="${bodyTag.attributes[FileImageTagDataConsts.ScreenMediaRequest]}"`;
    }

    return `<${FileImageTagDataConsts.TagName} ${fileIdAttr} ${screenMediaRequestAttr}></${FileImageTagDataConsts.TagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    let fileId = elem.getAttribute(FileImageTagDataConsts.FileIdAttrName);

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

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

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
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: attrs,
      innerHtml: ""
    };
  }
}
