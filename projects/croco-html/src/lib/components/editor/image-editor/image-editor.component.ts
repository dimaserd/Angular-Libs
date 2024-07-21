import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts } from '../../../extensions/ImageMethods';
import { HtmlBodyTag } from '../../../models/models';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { CrocoHtmlOptions } from '../../../extensions/HtmlExtractionMethods';

@Component({
  selector: 'croco-html-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
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
