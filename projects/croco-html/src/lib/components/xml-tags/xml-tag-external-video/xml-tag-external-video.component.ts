import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {ExternalVideoSupportedTypes, ExternalVideoTagData} from '../../../extensions';
import { YoutubeVideoPlayerComponent } from '../../editor/external-video-block/youtube-video-player/youtube-video-player.component';
import { VkVideoPlayerComponent } from '../../editor/external-video-block/vk-video-player/vk-video-player.component';
@Component({
    selector: 'croco-html-xml-tag-external-video',
    templateUrl: './xml-tag-external-video.component.html',
    styleUrls: ['./xml-tag-external-video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [VkVideoPlayerComponent, YoutubeVideoPlayerComponent],
})
export class XmlTagExternalVideoComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: ExternalVideoTagData) {
    this._block = {
      type: value.type,
      link: value.link
    }
  };

  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  public _block: ExternalVideoTagData = {
    type: '',
    link: ''
  }
}
