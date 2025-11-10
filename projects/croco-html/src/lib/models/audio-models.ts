export interface FileAudioTagData {
  fileId: string;
  title?: string;
}

export interface FileAudioTag {
  tagName: string;
  data: FileAudioTagData;
}
