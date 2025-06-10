import { ChatMessageAttachmentFileModel } from "../services/ChatMessagingService";

export function isAttachmentFileModel(
  file: ChatMessageAttachmentFileModel | File,
): file is ChatMessageAttachmentFileModel {
  return 'fileId' in file;
}
