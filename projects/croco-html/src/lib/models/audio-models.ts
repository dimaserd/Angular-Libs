export interface FileAudioTagData {
  src: string;
  fileId: string;
  fileName: string;
}

export interface FileAudioTag {
  tagName: string;
  data: FileAudioTagData;
}
