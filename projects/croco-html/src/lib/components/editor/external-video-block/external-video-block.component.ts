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


  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  tagData: ExternalVideoTagData = {
    link: '',
    type: ExternalVideoSupportedTypes.Youtube
  };

  ngOnInit(): void {
    this.tagData.link = (this.tag.attributes as ExternalVideoTagData).link;
    this.tagData.type = (this.tag.attributes as ExternalVideoTagData).type
  }

  linkChanged(){
    this.tag.attributes = this.tagData;
  }
}
