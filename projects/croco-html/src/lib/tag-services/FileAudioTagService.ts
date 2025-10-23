import { FileAudioTagDataConsts, AudioMethods } from "../extensions/AudioMethods";
import { InterfaceBlock } from "../models/InterfaceBlock";
import { HtmlBodyTag, FileAudioTagData } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService } from "../tag-services/IMarkUpTagService";

export class FileAudioTagService implements IMarkUpTagService {
  tagName: string = FileAudioTagDataConsts.TagName;
  shortDescription: string = "Аудио";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    let fileIdAttr = "";
    let fileNameAttr = "";

    if (bodyTag.attributes.hasOwnProperty(FileAudioTagDataConsts.FileIdAttrName) &&
        bodyTag.attributes[FileAudioTagDataConsts.FileIdAttrName]) {
      fileIdAttr = `${FileAudioTagDataConsts.FileIdAttrName}="${bodyTag.attributes[FileAudioTagDataConsts.FileIdAttrName]}"`;
    }

    if (bodyTag.attributes.hasOwnProperty(FileAudioTagDataConsts.FileNameAttrName) &&
        bodyTag.attributes[FileAudioTagDataConsts.FileNameAttrName]) {
      fileNameAttr = ` ${FileAudioTagDataConsts.FileNameAttrName}="${bodyTag.attributes[FileAudioTagDataConsts.FileNameAttrName]}"`;
    }

    return `<${FileAudioTagDataConsts.TagName} ${fileIdAttr}${fileNameAttr}></${FileAudioTagDataConsts.TagName}>`;
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    let fileId = elem.getAttribute(FileAudioTagDataConsts.FileIdAttrName);
    let fileName = elem.getAttribute(FileAudioTagDataConsts.FileNameAttrName);

    let src = AudioMethods.buildUrl(fileId, fileName);

    return {
      tagName: FileAudioTagDataConsts.TagName,
      data: {
        src,
        fileId: fileId,
        fileName: fileName
      }
    };
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {
    let fileData = data.data as FileAudioTagData;

    let attrs = {};

    if (fileData.fileId) {
      attrs[FileAudioTagDataConsts.FileIdAttrName] = fileData.fileId;
    }

    if (fileData.fileName) {
      attrs[FileAudioTagDataConsts.FileNameAttrName] = fileData.fileName;
    }

    return {
      tagDescription: {
        tag: FileAudioTagDataConsts.TagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: attrs,
      innerHtml: ""
    };
  }

  getDefaultValue(): HtmlBodyTag {
    return {
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: {
        [FileAudioTagDataConsts.FileIdAttrName]: '',
        [FileAudioTagDataConsts.FileNameAttrName]: ''
      },
      innerHtml: "",
    }
  }
}
