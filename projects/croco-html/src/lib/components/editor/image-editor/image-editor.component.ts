import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts } from '../../../extensions';
import { HtmlBodyTag } from '../../../models/models';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../extensions/HtmlExtractionMethods';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FileIdSelectComponent } from '../../file-id-select/file-id-select.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import {CdkDragHandle} from "@angular/cdk/drag-drop";
import {MatCard, MatCardContent} from "@angular/material/card";
import {XmlTagExternalVideoComponent} from "../../xml-tags";
import {NgStyle} from "@angular/common";
import {ScreenWidthService} from "../../../services/screen-width.service";

export interface IMediaRequest {
  screenWidth: number,
  maxImageHeight: number,
}

export const defaultImageMaxHeight = 300

@Component({
    selector: 'croco-html-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.css'],
    standalone: true,
  imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatIcon, FileIdSelectComponent, MatFormField, MatLabel, MatInput, CdkDragHandle, MatCard, MatCardContent, XmlTagExternalVideoComponent, NgStyle]
})
export class ImageEditorComponent implements OnInit {

  hasImageError = false;
  searchOrEdit = "search";
  requests: IMediaRequest[] = [];
  imageMaxHeight = defaultImageMaxHeight;

  @Input()
  tag: HtmlBodyTag;

  onErrorHandler(){
    this.hasImageError = true;
  }

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions,
    screenWidth: ScreenWidthService) {

    screenWidth.getScreenWidth().subscribe(screenWidth => {
      ScreenSizeChanged(screenWidth, this.requests);
    })
  }

  getSrc(){
    return ImageMethods.buildUrl(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName], "Medium", this._options);
  }

  hasFileId(){
    return this.tag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && !isNaN(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName]);
  }

  onFileIdChanged(fileId:number){
    this.tag.attributes[FileImageTagDataConsts.FileIdAttrName] = fileId;
    this.removeImageError();
  }

  removeImageError(){
    this.hasImageError = false;
  }

  ngOnInit(): void {

    console.log(this.tag.attributes, 'this.tag.attributesthis.tag.attributesthis.tag.attributesthis.tag.attributesthis.tag.attributes')
    console.log(this.requests, 'requests123')
    this.requests = MediaRequestStringToArrayParser(this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest])

  }

  requestChanged() {
    this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest] = MediaRequestsArrayToStringParser(this.requests)
  }
}

export const MediaRequestStringToArrayParser = (data: string) => {
  if(!data.length) {
    return []
  }

  return  data.split(';').reduce((requests: IMediaRequest[], currentValue: string ) => {
    requests.push({
      screenWidth: +currentValue.split(',')[0],
      maxImageHeight: +currentValue.split(',')[1],
    })
    return requests
  }, []).sort((a,b) => a.screenWidth > b.screenWidth ? -1 : 1)
}

export const MediaRequestsArrayToStringParser = (data: IMediaRequest[]) => {
  if(!data.length) {
    return ''
  }

  return data.map(el=> `screen-width:${el.screenWidth},max-image-height:${el.maxImageHeight}`).join(';')
}

export const ScreenSizeChanged = (screenSize: number, requests: IMediaRequest[]) => {
  let newSize = defaultImageMaxHeight;
  for(let i = 0; i < requests.length; i++ ) {
    if(screenSize < requests[i].screenWidth) {
      newSize = requests[i].maxImageHeight
    }
  }
  return newSize
}
