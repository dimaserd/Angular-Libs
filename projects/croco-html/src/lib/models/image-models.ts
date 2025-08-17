import { HtmlBodyTag } from "./models";

export interface ImageRestrictions {
  maxWidth: number | undefined;
  maxHeight: number | undefined;
}

export interface FileImageTag {
  tagName: string;
  data: FileImageTagData;
}

export interface FileImageTagData {
  src: string;
  fileId: string;
  screenMediaRequest: string;
}

export interface IImageMediaRequest {
  minScreenWidth: number;
  maxScreenWidth: number;
  maxImageHeight?: number;
  maxImageWidth?: number;
}