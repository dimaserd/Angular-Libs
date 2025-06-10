import { ChatMessageAttachmentFileModel } from '../services/ChatMessagingService';
import { isAttachmentFileModel } from './is-attachment-file-model';

export function isFile(file: ChatMessageAttachmentFileModel | File): file is File {
  return !isAttachmentFileModel(file);
}
