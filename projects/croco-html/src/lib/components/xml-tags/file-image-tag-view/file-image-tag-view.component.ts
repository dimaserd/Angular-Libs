import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { InterfaceBlock } from '../../../models/InterfaceBlock';
import { ImageMethods } from '../../../extensions';
import { ScreenWidthService } from "../../../services/screen-width.service";
import { Subject, takeUntil } from "rxjs";
import { NgStyle } from "@angular/common";
import { CrocoHtmlOptions } from '../../../options';
import { CrocoHtmlOptionsToken } from '../../../consts';
import { FileImageTagData, IImageMediaRequest } from '../../../models';

@Component({
  selector: 'croco-html-file-image-tag-view',
  templateUrl: './file-image-tag-view.component.html',
  imports: [
    NgStyle
  ],
  standalone: true
})
export class FileImageTagViewComponent implements OnInit, OnDestroy {

  @Input() set item(item: InterfaceBlock) {
    let data = item.data as FileImageTagData;
    this.imageData = data;
    this.imageSrc = data.src;
    this.requests = this.getMediaRequests(data.screenMediaRequest);
  }

  imageSrc = "";
  imageData: FileImageTagData | null = null;
  requests: IImageMediaRequest[] = []

  private unsubscribe = new Subject<void>();
  public imageMaxHeight: number = null;
  public imageMaxWidth: number = null;

  constructor(private readonly screenWidthService: ScreenWidthService,
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
  ) { }

  getMediaRequests(screenMediaRequest: string) : IImageMediaRequest[] {
    let result = ImageMethods.mediaRequestStringToArrayParser(screenMediaRequest);

    if (result.length === 0) {
      return this._options.imageOptions.globalMediaRequests ?? [];
    }

    return result;
  }

  ngOnInit(): void {
    this.screenWidthService.getScreenWidth()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(screenWidth => {
        let restrictions = ImageMethods.getImageRestrictionsByScreenSize(screenWidth, this.requests);
        
        this.imageMaxHeight = restrictions.maxHeight;
        this.imageMaxWidth = restrictions.maxWidth;

        if (this._options.imageOptions.visualEditorOptions?.previewModeImageMaxHeight) {
          const visualMaxHeight = this._options.imageOptions.visualEditorOptions.previewModeImageMaxHeight;
          if (this.imageMaxHeight === null || this.imageMaxHeight === undefined || visualMaxHeight < this.imageMaxHeight) {
            this.imageMaxHeight = visualMaxHeight;
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onImageClick(): void {
    if (this.imageData && this._options.imageOptions.onImageClick) {
      this._options.imageOptions.onImageClick(this.imageData);
    }
  }
}
