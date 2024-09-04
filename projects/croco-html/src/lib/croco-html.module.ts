import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CrocoHtmlDeclarations, MaterialModules } from ".";
import { YouTubePlayerModule } from "@angular/youtube-player";
import {
    VkVideoPlayerComponent
} from "./components/editor/external-video-block/vk-video-player/vk-video-player.component";
import { ErrorBannerComponent } from "./components/error-banner/error-banner.component";
import {
    YoutubeVideoPlayerComponent
} from "./components/editor/external-video-block/youtube-video-player/youtube-video-player.component";
import {DownloadButtonBlockComponent} from "./components/editor/download-button-block/download-button-block.component";
import {
  XmlTagDownloadButtonComponent
} from "./components/xml-tags/xml-tag-download-button/xml-tag-download-button.component";

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
    YouTubePlayerModule,
    VkVideoPlayerComponent,
    YoutubeVideoPlayerComponent,
    DownloadButtonBlockComponent,
    XmlTagDownloadButtonComponent
  ]
})
export class CrocoHtmlModule { }
