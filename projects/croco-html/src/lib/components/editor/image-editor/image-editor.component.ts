import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts } from '../../../extensions/ImageMethods';
import { HtmlBodyTag } from '../../../models/models';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../extensions/HtmlExtractionMethods';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FileIdSelectComponent } from '../../file-id-select/file-id-select.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';

@Component({
    selector: 'croco-html-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.css'],
    standalone: true,
    imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatIcon, FileIdSelectComponent, MatFormField, MatLabel, MatInput]
})
export class ImageEditorComponent implements OnInit {

  hasImageError = false;
  searchOrEdit = "search";

  @Input()
  tag: HtmlBodyTag;

  onErrorHandler(){
    this.hasImageError = true;
  }

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) { }

  getSrc(){
    return ImageMethods.buildUrl(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName], "Medium", this._options);
  }

  hasFileId(){
    return this.tag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName) && !isNaN(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName]);
  }

  onFileIdChanged(fileId:number){
    this.tag.attributes[FileImageTagDataConsts.FileIdAttrName] = fileId;
    this.removeImageError();
  }

  removeImageError(){
    this.hasImageError = false;
  }

  ngOnInit(): void {
  }

}
