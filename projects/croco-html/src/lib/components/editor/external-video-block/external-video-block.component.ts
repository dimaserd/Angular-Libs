import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ExternalVideoTagData,
  ExternalVideoSupportedTypes,
} from '../../../extensions';
import { HtmlBodyTag } from '../../../models/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { XmlTagExternalVideoComponent } from '../../xml-tags';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'croco-html-external-video-block',
  templateUrl: './external-video-block.component.html',
  styleUrls: ['./external-video-block.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    XmlTagExternalVideoComponent,
  ]
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

  linkText = '';

  ngOnInit(): void {
    this.tagData.link = (this.tag.attributes as ExternalVideoTagData).link;
    this.tagData.type = (this.tag.attributes as ExternalVideoTagData).type;

    this.linkText = this.tagData.type === ExternalVideoSupportedTypes.VkVideo ? 'Ссылка на Vk Video' : ' Ссылка на YouTube';
  }

  linkChanged(){
    if(this.tagData.link.includes('iframe')) {
      this.createLinkByIFrame()
    }
    this.tag.attributes = this.tagData;
  }

  createLinkByIFrame() {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.tagData.link, "text/html");
    const elem = document.body.children[0];
    const src = elem.getAttribute("src");
    this.tagData.link = src;
  }
}
