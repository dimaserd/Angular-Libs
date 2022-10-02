import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InterfaceBlock } from "../../../extensions/InterfaceBlock";
import { ExternalVideoTagData } from '../../../extensions/VideoMethods';

@Component({
  selector: 'croco-html-xml-tag-external-video',
  templateUrl: './xml-tag-external-video.component.html',
  styleUrls: ['./xml-tag-external-video.component.css']
})
export class XmlTagExternalVideoComponent implements OnInit {

  @Input()
  data: InterfaceBlock;

  @Input()
  tagData: ExternalVideoTagData;

  widgetUrl: SafeResourceUrl;

  getYouTubeId(youtubeLink:string){

    //https://www.youtube.com/watch?v=l3KfbfkxJOU
    if(youtubeLink.includes("watch?v=")){
      var url = new URL(youtubeLink);
      return url.searchParams.get("v");
    }

    //https://youtu.be/jzBneaWSswY
    let bits = youtubeLink.split('/')
    return bits[bits.length - 1];
  }

  getWidgetLink(youtubeLink:string){

    let id = this.getYouTubeId(youtubeLink);

    let result = `https://www.youtube.com/embed/${id}?controls=0`;

    this.widgetUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(result);
    return result;
  }



  constructor(private _domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.data != null){
      this.tagData = this.data.data as ExternalVideoTagData;
    }

    let youtubeWidgetLink = this.getWidgetLink(this.tagData.link);
    this.widgetUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(youtubeWidgetLink);
  }



}
