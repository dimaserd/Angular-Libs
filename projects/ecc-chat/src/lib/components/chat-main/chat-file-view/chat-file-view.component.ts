import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChatMessageAttachmentFileModel } from '../../../services/ChatMessagingService';
import { PipeMapperPipe } from '../../../pipes/pipe-mapper.pipe';
import { isAttachmentFileModel } from '../../../utils/is-attachment-file-model';
import { formatFileSize } from '../../../utils/base/format-file-size';
import { ChatSymbolSpritePipe } from '../../../pipes/chat-symbol-sprite.pipe';

@Component({
  selector: 'ecc-chat-file-view',
  templateUrl: './chat-file-view.component.html',
  styleUrls: ['./chat-file-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PipeMapperPipe, ChatSymbolSpritePipe]
})
export class ChatFileViewComponent implements OnChanges {
  @Input() public file?: File | ChatMessageAttachmentFileModel;
  @Input() public uploadingProgress?: { uploadingLoaded?: number; uploadingTotal?: number };
  @Input() public isUploading?: boolean;
  public fileExt?: string;
  public fileName?: string;

  ngOnChanges(): void {
    this.fileName = this.file ? (isAttachmentFileModel(this.file) ? this.file.fileName : this.file.name) : '';
    this.fileExt =
      (this.fileName.lastIndexOf('.') !== -1
        ? this.fileName.slice(this.fileName.lastIndexOf('.') + 1, this.fileName.length)
        : '') || 'Файл';
  }

  public formatFileSize(size?: number): string {
    return typeof size === 'number' ? formatFileSize(size ?? 0) : ' ';
  }
}
