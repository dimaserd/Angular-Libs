import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {ExternalVideoTagData} from '../../../extensions';

@Component({
  selector: 'croco-html-xml-tag-external-video',
  templateUrl: './xml-tag-external-video.component.html',
  styleUrls: ['./xml-tag-external-video.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmlTagExternalVideoComponent implements OnInit {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: ExternalVideoTagData) {
    this.videoId = this.getYouTubeId(value.link);
  };

  public videoId?: string;

  constructor(private _domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const youtubeIframeApiUrl = 'https://www.youtube.com/iframe_api';
    if (!document.querySelector(`script[src="${youtubeIframeApiUrl}"]`)) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.setAttribute('src', youtubeIframeApiUrl);
      document.body.appendChild(tag);
    }
  }

  private getYouTubeId(youtubeLink:string): string {

    //https://www.youtube.com/watch?v=l3KfbfkxJOU
    if(youtubeLink.includes("watch?v=")){
      const url = new URL(youtubeLink);
      return url.searchParams.get("v");
    }

    //https://youtu.be/jzBneaWSswY
    const bits = youtubeLink.split('/')
    return bits[bits.length - 1];
  }
}
