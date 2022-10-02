import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileImageTagDataConsts } from '../../extensions/ImageMethods';
import { HtmlBodyTag } from '../../models/models';
import { BaseApiResponseWithFilesIds } from '../../services/file-upload.service';
import { FilePostingStarted, UploadFilesBtnComponent } from '../upload-files-btn/upload-files-btn.component';

@Component({
  selector: 'croco-add-files-btn',
  templateUrl: './add-files-btn.component.html',
  styleUrls: ['./add-files-btn.component.css']
})
export class AddFilesBtnComponent implements OnInit {

  @Output()
  postFilesStarted = new EventEmitter<FilePostingStarted>();

  @ViewChild("fakeBtn")
  fakeBtn!: UploadFilesBtnComponent;

  fileIds:number[] = [];

  constructor() { }

  @Output()
  filesTagsReady = new EventEmitter<HtmlBodyTag[]>();

  postFilesStartedEventHandler(data: FilePostingStarted){
    this.postFilesStarted.emit(data);
  }

  filesUploadedHandler(data: BaseApiResponseWithFilesIds){
    this.fileIds = data.responseObject;

    let fileTags:HtmlBodyTag[] = [];

    for(let i=0; i < this.fileIds.length; i++){
      let fileTag: HtmlBodyTag = {
        presentOrEdit: true,
        tagDescription: {
          tag: FileImageTagDataConsts.TagName,
          displayValue: "Изображение"
        },
        attributes: {
          [FileImageTagDataConsts.FileIdAttrName]: this.fileIds[i]
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
