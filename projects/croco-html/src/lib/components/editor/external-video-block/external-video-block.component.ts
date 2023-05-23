import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ExternalVideoTagData, ExternalVideoSupportedTypes } from '../../../extensions/VideoMethods';
import { HtmlBodyTag } from '../../../models/models';

@Component({
  selector: 'croco-html-external-video-block',
  templateUrl: './external-video-block.component.html',
  styleUrls: ['./external-video-block.component.css']
})
export class ExternalVideoBlockComponent implements OnInit {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  myForm = new UntypedFormGroup({
    youtubeLink: new UntypedFormControl()
  });

  defaultLink = "https://youtu.be/jzBneaWSswY";

  data = {
    youtubeLink: this.defaultLink
  }

  tagData: ExternalVideoTagData = {
    link: this.defaultLink,
    type: ExternalVideoSupportedTypes.Youtube
  };

  linkChanged(){
    this.tagData.link = this.data.youtubeLink;
    this.tag.attributes = this.tagData;
  }

  ngOnInit(): void {
    this.linkChanged();

    this.tagData = this.tag.attributes as ExternalVideoTagData;
    this.data.youtubeLink = this.tagData.link;
  }
}
