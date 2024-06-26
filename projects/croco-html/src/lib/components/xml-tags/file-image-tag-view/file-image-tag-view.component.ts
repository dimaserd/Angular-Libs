import { Component, Input, OnInit } from '@angular/core';
import { InterfaceBlock } from '../../../extensions/InterfaceBlock';
import { FileImageTagData } from '../../../extensions';
import { ITagViewOptions } from '../../../models/models';

@Component({
  selector: 'croco-html-file-image-tag-view',
  templateUrl: './file-image-tag-view.component.html',
  styleUrl: './file-image-tag-view.component.css'
})
export class FileImageTagViewComponent implements OnInit {
  
  @Input()
  item: InterfaceBlock;

  @Input()
  viewOptions: ITagViewOptions = {
    useCustomImageUrlRenderer: false,
    renderImageUrl(fileId, sizeType) {
      return "";
    },
  } 

  imageSrc = "";

  ngOnInit(): void {

    let data = this.item.data as FileImageTagData;

    this.imageSrc = this.viewOptions.useCustomImageUrlRenderer 
      ? this.viewOptions.renderImageUrl(data.fileId, 'Medium')
      : data.src;

    if (!this.imageSrc) {
      this.imageSrc = data.src;
    }
  }
}
