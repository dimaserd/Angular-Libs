import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageMethods } from '../../extensions/ImageMethods';
import { FileNameAndIdModel, FilesQueryService, FileType } from '../../services/files-query.service';
import { CrocoHtmlOptionsToken } from '../../consts';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CrocoHtmlOptions } from '../../options';

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
    fileId: number;

    loading = false;

    files: FileNameAndIdModel[] = [];

    @Output()
    onFileIdChanged = new EventEmitter<number>();

    constructor(
        private readonly _fileService: FilesQueryService,
        @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
    ) {
    }

    onModelChanged(fileId: number) {
        this.onFileIdChanged.emit(fileId);
    }

    getSrc(fileId: number) {
        return ImageMethods.buildSmallUrl(fileId, this._options);
    }

    ngOnInit(): void {
        this.loadFiles();
    }

    public loadFiles() {
        this.loading = true;
        this._fileService.getFiles({
            count: 10,
            offSet: 0,
            fileName: null,
            fileTypes: [FileType.Image],
            applicationId: null,
            q: this.q
        }).subscribe(data => {
            this.files = [...data.list];
            this.loading = false;
        });
    }

    onSearchChanged(q: { term: string, items: object[] }) {
        this.q = q.term;
        this.loadFiles();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadFiles();
    }
}
