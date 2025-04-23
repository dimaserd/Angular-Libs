
export interface ImageRestrictions {
  maxWidth: number | undefined;
  maxHeight: number | undefined;
}

export interface FileImageTag {
  type: string;
  data: FileImageTagData;
}

export interface FileImageTagData {
  src: string;
  fileId: number | string;
  screenMediaRequest: string;
}

export interface IMediaRequest {
  minScreenWidth: number;
  maxScreenWidth: number;
  maxImageHeight?: number;
  maxImageWidth?: number;
}
