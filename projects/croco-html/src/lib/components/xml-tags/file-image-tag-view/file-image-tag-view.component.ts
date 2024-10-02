import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { InterfaceBlock } from '../../../extensions/InterfaceBlock';
import { FileImageTagData, ImageMethods, IMediaRequest } from '../../../extensions';
import { ScreenWidthService } from "../../../services/screen-width.service";
import { Subject, takeUntil } from "rxjs";
import { NgStyle } from "@angular/common";
import { CrocoHtmlOptions } from '../../../options';
import { CrocoHtmlOptionsToken } from '../../../consts';

@Component({
  selector: 'croco-html-file-image-tag-view',
  templateUrl: './file-image-tag-view.component.html',
  styleUrl: './file-image-tag-view.component.css',
  imports: [
    NgStyle
  ],
  standalone: true
})
export class FileImageTagViewComponent implements OnInit, OnDestroy {

  @Input() set item(item: InterfaceBlock) {
    let data = item.data as FileImageTagData;
    this.imageSrc = data.src;
    this.requests = this.getMediaRequests(data.screenMediaRequest);
  }

  imageSrc = "";
  requests: IMediaRequest[] = []

  private unsubscribe = new Subject<void>();
  public imageMaxHeight = null;

  constructor(private readonly screenWidthService: ScreenWidthService,
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions
  ) { }

  getMediaRequests(screenMediaRequest: string) : IMediaRequest[] {
    let result = ImageMethods.mediaRequestStringToArrayParser(screenMediaRequest);

    if (result.length === 0) {
      return this._options.globalMediaRequests ?? [];
    }

    return result;
  }

  ngOnInit(): void {
    this.screenWidthService.getScreenWidth()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(screenWidth => {
        this.imageMaxHeight = ImageMethods.screenSizeChanged(screenWidth, this.requests);
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
