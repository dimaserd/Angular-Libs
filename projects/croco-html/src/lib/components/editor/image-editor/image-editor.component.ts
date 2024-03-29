import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts } from '../../../extensions/ImageMethods';
import { HtmlBodyTag } from '../../../models/models';

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

  constructor() { }

  getSrc(){
    return ImageMethods.buildUrl(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName], { useCustomDomain: false, domain: ""});
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
