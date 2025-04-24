import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageMethods } from '../../extensions/ImageMethods';
import { FileType, PublicFilesQueryService} from '../../services/PublicFilesQueryService';
import { CrocoHtmlOptionsToken} from '../../consts';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {CrocoHtmlEditorFileOptions, CrocoHtmlOptions} from '../../options';
import {PrivateFilesQueryService} from "../../services/PrivateFilesQueryService";
import {HtmlSettingsService} from "../../services/html-settings.service";

export interface SearchQuestionsFormData {
    q: string;
}

export interface FileUnifiedModel {
  fileId: string;
  applicationId: string;
  fileName: string;
  type: FileType;
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
    fileId: string;

    loading = false;

    files: FileUnifiedModel[] = [];

    @Output()
    onFileIdChanged = new EventEmitter<string>();

    get crocoHtmlEditorFileOptions(): CrocoHtmlEditorFileOptions {
      return this._htmlSettingsService.get();
    }

    constructor(
        private readonly _publicFileService: PublicFilesQueryService,
        private readonly _privateFileService: PrivateFilesQueryService,
        private _htmlSettingsService: HtmlSettingsService,
        @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
    ) {
    }

    onModelChanged(fileId: string) {
        this.onFileIdChanged.emit(fileId);
    }

    getSrc(fileId: string) {
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

      const setFiles = (data): FileUnifiedModel[] => {
        return data.list.map(el => ({fileId: el.id ?? el.fileId, applicationId: el.applicationId ?? null, fileName: el.fileName, type: el.type }));
      }

      if (isPrivate) {
        this._privateFileService.search(searchParams)
          .subscribe(data => {
            this.files = setFiles(data)
            this.loading = false;
        });
      } else {
        this._publicFileService.search(searchParams)
          .subscribe(data => {
            this.files = setFiles(data)
            this.loading = false;
          })
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
