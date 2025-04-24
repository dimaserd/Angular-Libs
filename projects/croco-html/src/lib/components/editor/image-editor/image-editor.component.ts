import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ImageMethods, FileImageTagDataConsts } from '../../../extensions';
import { HtmlBodyTag } from '../../../models/models';
import { CrocoHtmlOptionsToken} from '../../../consts';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FileIdSelectComponent } from '../../file-id-select/file-id-select.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { NgStyle } from "@angular/common";
import { ScreenWidthService } from "../../../services/screen-width.service";
import { MatIconButton } from "@angular/material/button";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { Subject, takeUntil } from "rxjs";
import { CrocoHtmlOptions } from '../../../options';
import { IMediaRequest } from '../../../models';

@Component({
  selector: 'croco-html-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle,
    MatIcon,
    FileIdSelectComponent,
    MatFormField,
    MatLabel,
    MatInput,
    NgStyle,
    MatIconButton,
    MatSlideToggle
  ]
})
export class ImageEditorComponent implements OnInit, OnDestroy {

  hasImageError = false;
  searchOrEdit = "search";
  requests: IMediaRequest[] = [];
  imageMaxHeight: number = null;
  imageMaxWidth: number = null;
  isShowMediaRequest = false;
  private unsubscribe = new Subject<void>();

  @Input()
  tag: HtmlBodyTag;

  onErrorHandler() {
    this.hasImageError = true;
  }

  @Output()
  onTagUpdated = new EventEmitter<HtmlBodyTag>();

  public get fileId(): string {
    return this.tag.attributes[FileImageTagDataConsts.FileIdAttrName];
  }

  public set fileId(value: string) {
    this.tag.attributes[FileImageTagDataConsts.FileIdAttrName] = value;
  }

  constructor(
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions,
    private readonly screenWidthService: ScreenWidthService,
  ) { }

  getSrc() {
    return ImageMethods.buildUrl(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName], "Medium", this._options);
  }

  hasFileId() {
    const hasFileId = this.tag.attributes.hasOwnProperty(FileImageTagDataConsts.FileIdAttrName);
    const fileId = this.tag.attributes[FileImageTagDataConsts.FileIdAttrName];

    if(!hasFileId) {
      return false
    }

    const isValidId = !isNaN(Number(this.tag.attributes[FileImageTagDataConsts.FileIdAttrName]));
    return ImageMethods.isPrivateFileId(fileId) ? true : isValidId;
  }

  onFileIdChanged(fileId: string) {
    this.tag.attributes[FileImageTagDataConsts.FileIdAttrName] = fileId;
    this.removeImageError();
  }

  removeImageError() {
    this.hasImageError = false;
  }

  ngOnInit(): void {
    let attr = this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest];
    this.requests = ImageMethods.mediaRequestStringToArrayParser(attr)

    this.screenWidthService.getScreenWidth()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(screenWidth => {
        let imageRestrictions = ImageMethods.getImageRestrictionsByScreenSize(screenWidth, this.requests);

        this.imageMaxHeight = imageRestrictions.maxHeight;
        this.imageMaxWidth = imageRestrictions.maxWidth;
      });
  }

  requestChanged() {
    this.tag.attributes[FileImageTagDataConsts.ScreenMediaRequest] = ImageMethods.mediaRequestsArrayToString(this.requests)
  }

  addNewMediaRequest() {
    this.requests.push({
      maxScreenWidth: 0,
      minScreenWidth: 0,
      maxImageHeight: 0,
      maxImageWidth: 0
    })
  }

  deleteMediaRequest(index: number) {
    this.requests.splice(index, 1);
    this.requestChanged();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
