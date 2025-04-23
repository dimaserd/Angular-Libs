import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileImageTagDataConsts } from '../../extensions';
import { HtmlBodyTag } from '../../models/models';
import { FilePostingStarted, UploadFilesBtnComponent } from '../upload-files-btn/upload-files-btn.component';
import { MatButton } from '@angular/material/button';
import { PublicFilesUploadResponse } from '../../services/PublicFileUploadService';
import {PrivateFilesCreatedResult} from "../../services/PrivateFileUploadService";

@Component({
    selector: 'croco-html-add-files-btn',
    templateUrl: './add-files-btn.component.html',
    standalone: true,
    imports: [UploadFilesBtnComponent, MatButton]
})
export class AddFilesBtnComponent implements OnInit {

  @Output()
  postFilesStarted = new EventEmitter<FilePostingStarted>();

  @ViewChild("fakeBtn")
  fakeBtn!: UploadFilesBtnComponent;


  constructor() { }

  @Output()
  filesTagsReady = new EventEmitter<HtmlBodyTag[]>();

  postFilesStartedEventHandler(data: FilePostingStarted){
    this.postFilesStarted.emit(data);
  }

  filesUploadedHandler(data: PublicFilesUploadResponse | PrivateFilesCreatedResult){

    let fileTags:HtmlBodyTag[] = [];

    for(let i = 0; i < data.fileIds.length; i++){
      let fileTag: HtmlBodyTag = {
        presentOrEdit: true,
        tagDescription: {
          tag: FileImageTagDataConsts.TagName,
          displayValue: "Изображение",
          isCustom: false
        },
        attributes: {
          [FileImageTagDataConsts.FileIdAttrName]: data.fileIds[i],
          [FileImageTagDataConsts.ScreenMediaRequest]: FileImageTagDataConsts.DefaultValueForFileImage
        },
        innerHtml: ""
      };

      fileTags.push(fileTag);
    }

    this.filesTagsReady.emit(fileTags);
  }

  handleClick(){
    this.fakeBtn.clickFileInput();
  }

  ngOnInit(): void {
  }
}
