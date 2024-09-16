import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts, IMediaRequest } from '../../../extensions';
import { HtmlBodyTag } from '../../../models/models';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../extensions/HtmlExtractionMethods';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FileIdSelectComponent } from '../../file-id-select/file-id-select.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { CdkDragHandle } from "@angular/cdk/drag-drop";
import { MatCard, MatCardContent } from "@angular/material/card";
import { XmlTagExternalVideoComponent } from "../../xml-tags";
import { NgStyle } from "@angular/common";
import { ScreenWidthService } from "../../../services/screen-width.service";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'croco-html-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  standalone: true,
  imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatIcon, FileIdSelectComponent, MatFormField, MatLabel, MatInput, CdkDragHandle, MatCard, MatCardContent, XmlTagExternalVideoComponent, NgStyle, MatButton, MatIconButton, MatSlideToggle]
})
export class ImageEditorComponent implements OnInit, OnDestroy {

  hasImageError = false;
  searchOrEdit = "search";
  requests: IMediaRequest[] = [];
  imageMaxHeight = null;
  isShowMediaRequest = false;
  private unsubscribe = new Subject<void>();

  @Input()
  tag: HtmlBodyTag;

  onErrorHandler() {
    this.hasImageError = true;
  }

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions,
    screenWidth: ScreenWidthService) {

    screenWidth.getScreenWidth()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(screenWidth => {
        this.imageMaxHeight = ImageMethods.screenSizeChanged(screenWidth, this.requests);
      })
  }

  getSrc() {
    return ImageMethods.buildUrl(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName], "Medium", this._options);
  }

  hasFileId() {
    return this.tag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && !isNaN(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName]);
  }

  onFileIdChanged(fileId: number) {
    this.tag.attributes[FileImageTagDataConsts.FileIdAttrName] = fileId;
    this.removeImageError();
  }

  removeImageError() {
    this.hasImageError = false;
  }

  ngOnInit(): void {

    let attr = this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest];
    this.requests = ImageMethods.mediaRequestStringToArrayParser(attr)
  }

  requestChanged() {
    this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest] = ImageMethods.mediaRequestsArrayToStringParser(this.requests)
  }

  addNewMediaRequest() {
    this.requests.push({
      screenWidth: 0,
      maxImageHeight: 0,
    })
  }

  deleteMediaRequest(index: number) {
    this.requests.splice(index, 1);
    this.requestChanged();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
