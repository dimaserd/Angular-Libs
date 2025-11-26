import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { InterfaceBlock } from "../../../models/InterfaceBlock";
import { TextTags } from '../../../extensions';
import { XmlTagDownloadFileButtonComponent } from '../xml-tag-download-file-button/xml-tag-download-file-button.component';
import { XmlTagExternalVideoComponent } from '../xml-tag-external-video/xml-tag-external-video.component';
import { ErrorBannerComponent } from '../../error-banner/error-banner.component';
import { XmlTagHtmlViewComponent } from '../xml-tag-html-view/xml-tag-html-view.component';
import { FileImageTagViewComponent } from '../file-image-tag-view/file-image-tag-view.component';
import { AudioPlayerTagViewComponent } from '../audio-player-tag-view/audio-player-tag-view.component';
import { XmlTagHeaderTextViewComponent } from '../xml-tag-header-text-view/xml-tag-header-text-view.component';
import { HtmlRawViewComponent } from '../html-raw-view/html-raw-view.component';
import { XmlTagTextViewComponent } from '../xml-tag-text-view/xml-tag-text-view.component';
import { XmlTagButtonComponent } from "../xml-tag-custom-button/xml-tag-button.component";
import { XmlTagCustomWidgetComponent } from "../xml-tag-custom-widget/xml-tag-custom-widget.component";
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../options';
import { DefinedCustomTagViewComponent } from '../defined-custom-tag-view/defined-custom-tag-view.component';
import { HtmlPageDataController } from '../../../services';

@Component({
  selector: 'croco-html-xml-tag-view',
  templateUrl: './xml-tag-view.component.html',
  styleUrls: ['./xml-tag-view.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    XmlTagTextViewComponent,
    HtmlRawViewComponent,
    XmlTagHeaderTextViewComponent,
    FileImageTagViewComponent,
    AudioPlayerTagViewComponent,
    XmlTagHtmlViewComponent,
    ErrorBannerComponent,
    XmlTagExternalVideoComponent,
    XmlTagDownloadFileButtonComponent,
    XmlTagButtonComponent,
    XmlTagCustomWidgetComponent,
    DefinedCustomTagViewComponent
  ],
})
export class XmlTagViewComponent {

  @Input({ required: true })
  data: InterfaceBlock[] = [];

  @Input({ required: true })
  dataController: HtmlPageDataController = new HtmlPageDataController();

  @Input()
  isEditor = false

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  isHeaderTextTag(item: InterfaceBlock) {
    return TextTags.headerTextTags.includes(item.tagName);
  }

  isDefinedCustomTag(item: InterfaceBlock) {
    return this._options.definedCustomTags.hasOwnProperty(item.tagName);
  }
}
