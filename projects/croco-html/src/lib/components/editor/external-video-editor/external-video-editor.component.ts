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
  selector: 'croco-html-external-video-editor',
  templateUrl: './external-video-editor.component.html',
  styleUrls: ['./external-video-editor.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    XmlTagExternalVideoComponent,
  ]
})
export class ExternalVideoEditorComponent implements OnInit {

  @Input()
  tag: HtmlBodyTag;

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  tagData: ExternalVideoTagData = {
    link: '',
    iframe: '',
    type: ExternalVideoSupportedTypes.Youtube
  };

  linkText = '';

  ngOnInit(): void {
    this.tagData.link = (this.tag.attributes as ExternalVideoTagData).link;
    this.tagData.type = (this.tag.attributes as ExternalVideoTagData).type;
    this.tagData.iframe = this.tag.innerHtml;

    switch (this.tagData.type) {
      case ExternalVideoSupportedTypes.Youtube: {
        this.linkText = 'Ссылка на YouTube'
        break;
      }
      case ExternalVideoSupportedTypes.VkVideo: {
        this.linkText = 'Ссылка на Vk Video'
        break;
      }
      case ExternalVideoSupportedTypes.Code: {
        this.linkText = 'Code'
        break;
      }
    }
  }

  linkChanged(){
    if(this.tagData.link.includes('iframe')) {
      this.createLinkByIFrame()
    }

    const { iframe, ...tagData } = this.tagData;
    this.tag.attributes = tagData;
    this.tag.innerHtml = iframe

  }

  createLinkByIFrame() {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.tagData.link, "text/html");
    const elem = document.body.children[0];
    const src = elem.getAttribute("src");
    this.tagData.link = src;
  }
}
