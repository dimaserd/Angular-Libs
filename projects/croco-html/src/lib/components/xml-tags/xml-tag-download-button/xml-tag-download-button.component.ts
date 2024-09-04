import {Component, Input} from '@angular/core';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {VkVideoPlayerComponent} from "../../editor/external-video-block/vk-video-player/vk-video-player.component";
import {
  YoutubeVideoPlayerComponent
} from "../../editor/external-video-block/youtube-video-player/youtube-video-player.component";
import {MatButton} from "@angular/material/button";
import {BlobCreateService} from "../../../services/blob-create.service";
import {DownloadButtonTagData} from "../../../extensions/DownloadButtonMethods";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'croco-html-xml-tag-download-button',
  standalone: true,
  imports: [
    VkVideoPlayerComponent,
    YoutubeVideoPlayerComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './xml-tag-download-button.component.html',
  styleUrl: './xml-tag-download-button.component.scss'
})
export class XmlTagDownloadButtonComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: DownloadButtonTagData) {
    this._block = {
      title: value.title,
      link: value.link
    }
  };

  constructor(private readonly _blobCreateService: BlobCreateService) {}

  public _block: DownloadButtonTagData = {
    title: '',
    link: ''
  }

  downloadFile() {
    this._blobCreateService.getBlob(this._block.link).subscribe(
      blob=> {
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
