import { Component, Input, OnInit } from '@angular/core';
import { InterfaceBlock } from '../../../extensions/InterfaceBlock';
import { FileImageTagData } from '../../../extensions';

@Component({
  selector: 'croco-html-file-image-tag-view',
  templateUrl: './file-image-tag-view.component.html',
  styleUrl: './file-image-tag-view.component.css'
})
export class FileImageTagViewComponent implements OnInit {
  
  @Input()
  item: InterfaceBlock;

  imageSrc = "";

  ngOnInit(): void {

    let data = this.item.data as FileImageTagData;

    this.imageSrc = data.src;
  }
}
