import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageMethods } from '../../extensions/ImageMethods';
import {FileSimpleModel, FileType, PublicFilesQueryService} from '../../services/PublicFilesQueryService';
import {crocoHtmlEditorFileOptionsToken, CrocoHtmlOptionsToken} from '../../consts';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {CrocoHtmlEditorFileOptions, CrocoHtmlOptions} from '../../options';
import {PrivateFileNameModel, PrivateFilesQueryService} from "../../services/PrivateFilesQueryService";

export interface SearchQuestionsFormData {
    q: string;
}

@Component({
    selector: 'croco-html-file-id-select',
    templateUrl: './file-id-select.component.html',
    styleUrls: ['./file-id-select.component.css'],
    standalone: true,
    imports: [NgSelectModule, FormsModule]
})
export class FileIdSelectComponent implements OnInit, OnChanges {

    q: string;

    @Input()
    labelText = "Поиск файлов"

    @Input()
    @Output()
    fileId: number | string;

    loading = false;

    files: FileSimpleModel[] | PrivateFileNameModel[] = [];

    @Output()
    onFileIdChanged = new EventEmitter<number | string>();

    get crocoHtmlEditorFileOptions(): CrocoHtmlEditorFileOptions {
      return crocoHtmlEditorFileOptionsToken.value
    }

    constructor(
        private readonly _publicFileService: PublicFilesQueryService,
        private readonly _privateFileService: PrivateFilesQueryService,
        @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
    ) {
    }

    onModelChanged(fileId: number) {
        this.onFileIdChanged.emit(fileId);
    }

    getSrc(fileId: number | string) {
      return ImageMethods.buildSmallUrl(fileId, this._options);
    }

    ngOnInit(): void {
        this.loadFiles();
    }

    public loadFiles() {
      this.loading = true;
      const isPrivate = this.crocoHtmlEditorFileOptions.usePrivateFiles;

      const searchParams = {
        count: 10,
        offSet: 0,
        fileName: null,
        fileTypes: [FileType.Image],
        applicationId: isPrivate ? this.crocoHtmlEditorFileOptions.applicationId : null,
        q: this.q
      };

      if (isPrivate) {
        this._privateFileService.search(searchParams).subscribe(data => {
          this.files = [...data.list];
          this.loading = false;
        });
      } else {
        this._publicFileService.search(searchParams).subscribe(data => {
          this.files = [...data.list];
          this.loading = false;
        });
      }
    }

    onSearchChanged(q: { term: string, items: object[] }) {
        this.q = q.term;
        this.loadFiles();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadFiles();
    }
}
