import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageMethods } from '../../extensions/ImageMethods';
import { FileNameAndIdModel, FilesQueryService } from '../../services/files-query.service';

export interface SearchQuestionsFormData{
    q: string;
}

@Component({
    selector: 'croco-html-file-id-select',
    templateUrl: './file-id-select.component.html',
    styleUrls: ['./file-id-select.component.css']
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
        private _fileService: FilesQueryService) {
    }

    onModelChanged(fileId: number){
        this.onFileIdChanged.emit(fileId);
    }

    getSrc(fileId: number){
        return ImageMethods.buildSmallUrl(fileId, { useCustomDomain: false, domain: "" });
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
            q: this.q
        }).subscribe(data => {
            this.files = [...data.list];
            this.loading = false;
        });
    }

    onSearchChanged(q: {term: string, items:object[]}){
        this.q = q.term;
        this.loadFiles();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadFiles();
    }
}
