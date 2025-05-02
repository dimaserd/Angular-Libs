import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileImageTagDataConsts } from '../../extensions';
import { HtmlBodyTag } from '../../models/models';
import { FilePostingStarted, UploadFilesBtnComponent } from '../upload-files-btn/upload-files-btn.component';
import { MatButton } from '@angular/material/button';
import { PublicFilesUploadResponse } from '../../services/PublicFileUploadService';
import { PrivateFilesCreatedResult } from "../../services/PrivateFileUploadService";

@Component({
  selector: 'croco-html-add-files-btn',
  templateUrl: './add-files-btn.component.html',
  standalone: true,
  imports: [UploadFilesBtnComponent, MatButton]
})
export class AddFilesBtnComponent {

  @Output()
  postFilesStarted = new EventEmitter<FilePostingStarted>();

  @ViewChild("fakeBtn")
  fakeBtn!: UploadFilesBtnComponent;

  fileIds: number[] = [];

  constructor() { }

  @Output()
  filesTagsReady = new EventEmitter<HtmlBodyTag[]>();

  postFilesStartedEventHandler(data: FilePostingStarted) {
    this.postFilesStarted.emit(data);
  }

  filesUploadedPublicHandler(data: PublicFilesUploadResponse) {
    const fileTags = this.buildFileTags(data.fileIds.map(el => el.toString()));
    this.filesTagsReady.emit(fileTags);
  }

  filesUploadedPrivateHandler(data: PrivateFilesCreatedResult) {
    const fileTags = this.buildFileTags(data.fileIds);
    this.filesTagsReady.emit(fileTags);
  }

  private buildFileTags(fileIds: string[]): HtmlBodyTag[] {
    return fileIds.map(fileId => ({
      presentOrEdit: true,
      tagDescription: {
        tag: FileImageTagDataConsts.TagName,
        displayValue: "Изображение",
        isCustom: false
      },
      attributes: {
        [FileImageTagDataConsts.FileIdAttrName]: fileId,
        [FileImageTagDataConsts.ScreenMediaRequest]: FileImageTagDataConsts.DefaultValueForFileImage
      },
      innerHtml: ""
    }));
  }

  handleClick() {
    this.fakeBtn.clickFileInput();
  }
}
