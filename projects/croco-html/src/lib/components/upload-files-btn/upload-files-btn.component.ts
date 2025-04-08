import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PublicFilesUploadResponse, PublicFileUploadService } from '../../services/PublicFileUploadService';
import { MatButton } from '@angular/material/button';

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

  constructor(private _fileUploadService: PublicFileUploadService) { }

  handleFileInput(files: FileList) {
    this.postFilesStarted.emit({
      filesCount: files.length
    });

    this._fileUploadService
      .postFiles(files, null)
      .subscribe(data => {
        this.onPublicFilesUploaded.emit(data);
      })
  }

  clickFileInput() {
    this.fileInput.nativeElement.click();
  }
}
