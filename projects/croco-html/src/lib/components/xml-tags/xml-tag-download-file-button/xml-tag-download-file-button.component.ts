import { Component, Input } from '@angular/core';
import { InterfaceBlock } from "../../../extensions/InterfaceBlock";
import { BlobCreateService } from "../../../services/blob-create.service";
import { MatIcon } from "@angular/material/icon";
import { DownloadButtonTagData } from '../../../tag-services/DownloadButtonTagService';

@Component({
  selector: 'croco-html-xml-tag-download-file-button',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './xml-tag-download-file-button.component.html',
  styleUrl: './xml-tag-download-file-button.component.scss'
})
export class XmlTagDownloadFileButtonComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: DownloadButtonTagData) {
    this._block = {
      title: value.title,
      link: value.link
    }
  };

  constructor(private readonly _blobCreateService: BlobCreateService) { }

  public _block: DownloadButtonTagData = {
    title: '',
    link: ''
  }

  downloadFile() {
    this._blobCreateService.getBlob(this._block.link).subscribe(
      blob => {
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;

        const regex = /[^/]+$/;
        link.download = this._block.link.match(regex)[0] || 'Без названия';
        link.click();
        URL.revokeObjectURL(objectUrl);
      }
    );
  }
}
