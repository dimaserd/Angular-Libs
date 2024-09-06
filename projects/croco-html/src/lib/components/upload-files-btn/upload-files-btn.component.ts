import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseApiResponseWithFilesIds, FileUploadService } from '../../services/file-upload.service';
import { MatButton } from '@angular/material/button';

export interface FilePostingStarted {
  filesCount: number;
  createLocalCopiesNow: boolean;
}

@Component({
  selector: 'croco-app-upload-files-btn',
  templateUrl: './upload-files-btn.component.html',
  styleUrls: ['./upload-files-btn.component.css'],
  standalone: true,
  imports: [MatButton]
})
export class UploadFilesBtnComponent implements OnInit {

  @ViewChild('filesInput')
  private fileInput!: ElementRef<HTMLInputElement>;

  @Input()
  extAccepts: string = "*/*";

  @Input()
  isMultiple = true;

  @Input()
  btnText: string = "Загрузить файлы";

  @Input()
  createLocalCopiesNow = true;

  @Input()
  hidden = false;

  @Output()
  postFilesStarted = new EventEmitter<FilePostingStarted>();

  @Output()
  onFilesUploaded = new EventEmitter<BaseApiResponseWithFilesIds>();

  constructor(private _fileUploadService: FileUploadService) { }

  handleFileInput(files: FileList) {
    this.postFilesStarted.emit({
      filesCount: files.length,
      createLocalCopiesNow: this.createLocalCopiesNow
    });

    this._fileUploadService.postFiles(files, this.createLocalCopiesNow).subscribe(data => {
      this.onFilesUploaded.emit(data);
    })
  }

  clickFileInput() {
    this.fileInput.nativeElement.click();
  }

  ngOnInit() {
  }
}
