import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PublicFilesUploadResponse, PublicFileUploadService } from '../../services/PublicFileUploadService';
import { MatButton } from '@angular/material/button';
import { PrivateFilesCreatedResult, PrivateFileUploadService } from "../../services/PrivateFileUploadService";
import { CrocoHtmlFileOptionsService } from "../../services/CrocoHtmlFileOptionsService";

export interface FilePostingStarted {
  filesCount: number;
}

@Component({
  selector: 'croco-app-upload-files-btn',
  templateUrl: './upload-files-btn.component.html',
  styleUrls: ['./upload-files-btn.component.css'],
  standalone: true,
  imports: [MatButton]
})
export class UploadFilesBtnComponent {

  @ViewChild('filesInput')
  private fileInput!: ElementRef<HTMLInputElement>;

  @Input()
  extAccepts: string = "*/*";

  @Input()
  isMultiple = true;

  @Input()
  btnText: string = "Загрузить файлы";

  @Input()
  hidden = false;

  @Output()
  postFilesStarted = new EventEmitter<FilePostingStarted>();

  @Output()
  onPublicFilesUploaded = new EventEmitter<PublicFilesUploadResponse>();

  @Output()
  onPrivateFilesUploaded = new EventEmitter<PrivateFilesCreatedResult>();

  constructor(
    private _publicFileUploadService: PublicFileUploadService,
    private _privateFileUploadService: PrivateFileUploadService,
    private _htmlSettingsService: CrocoHtmlFileOptionsService,
  ) { }

  handleFileInput(files: FileList) {
    this.postFilesStarted.emit({
      filesCount: files.length
    });

    if (this._htmlSettingsService.get().usePrivateFiles) {
      this._privateFileUploadService
        .postFiles(files, this._htmlSettingsService.get().applicationId)
        .subscribe(data => {
          this.onPrivateFilesUploaded.emit(data);
        })
    }
    else {
      this._publicFileUploadService
        .postFiles(files, null)
        .subscribe(data => {
          this.onPublicFilesUploaded.emit(data);
        })
    }
  }

  clickFileInput() {
    this.fileInput.nativeElement.click();
  }
}
