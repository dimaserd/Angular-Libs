import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CrocoHtmlDeclarations, MaterialModules } from ".";
import {
    VkVideoPlayerComponent
} from "./components/editor/external-video-block/vk-video-player/vk-video-player.component";
import { ErrorBannerComponent } from "./components/error-banner/error-banner.component";
import {
    YoutubeVideoPlayerComponent
} from "./components/editor/external-video-block/youtube-video-player/youtube-video-player.component";
import {DownloadFileButtonBlockComponent} from "./components/editor/download-file-button-block/download-file-button-block.component";
import {
  XmlTagDownloadFileButtonComponent
} from "./components/xml-tags/xml-tag-download-file-button/xml-tag-download-file-button.component";

@NgModule({
    declarations: [
      ...CrocoHtmlDeclarations,
    ],
    exports: [
      ...CrocoHtmlDeclarations,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ...MaterialModules,
    ErrorBannerComponent,
    VkVideoPlayerComponent,
    YoutubeVideoPlayerComponent,
    DownloadFileButtonBlockComponent,
    XmlTagDownloadFileButtonComponent
  ]
})
export class CrocoHtmlModule { }
