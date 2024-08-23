import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ExternalVideoTagData,
  ExternalVideoSupportedTypes,
} from '../../../extensions';
import { HtmlBodyTag } from '../../../models/models';

@Component({
  selector: 'croco-html-external-video-block',
  templateUrl: './external-video-block.component.html',
  styleUrls: ['./external-video-block.component.scss']
})
export class ExternalVideoBlockComponent implements OnInit {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  defaultYoutubeLink = "https://youtu.be/jzBneaWSswY";
  defaultVkLink = "https://vk.com/video_ext.php?oid=-22822305&id=456241864&hd=2";
  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  tagData: ExternalVideoTagData = {
    link: this.defaultYoutubeLink,
    type: ExternalVideoSupportedTypes.Youtube
  };

  ngOnInit(): void {
    this.tagData.link = (this.tag.attributes as ExternalVideoTagData).type === ExternalVideoSupportedTypes.VkVideo ? this.defaultVkLink : this.defaultYoutubeLink;
    this.tagData.type = (this.tag.attributes as ExternalVideoTagData).type
  }
}
