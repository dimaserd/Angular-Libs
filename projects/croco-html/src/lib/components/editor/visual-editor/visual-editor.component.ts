import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  BodyTagsExtensions, ExternalVideoPlayers,
  ExternalVideoSupportedTypes,
  TextTags
} from '../../../extensions';
import { FileImageTagDataConsts } from '../../../extensions';
import {
  ExternalVideoTagDataConsts,
} from '../../../extensions';
import { XmlExtensions } from '../../../extensions';
import { TagItem, HtmlBodyTag } from '../../../models/models';
import { FilePostingStarted } from '../../upload-files-btn/upload-files-btn.component';
import { DefaultTags } from './DefaultTags';
import { AlignmentsData, EAlignments } from "./DefaultAligments";
import { CrocoHtmlOptionsToken } from '../../../consts';
import { DownloadButtonTagDataConsts } from "../../../extensions/DownloadButtonMethods";
import { MainEditorBlockComponent } from '../main-editor-block/main-editor-block.component';
import { AddFilesBtnComponent } from '../../add-files-btn/add-files-btn.component';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ButtonTagDataConsts } from "../../../extensions/ButtonMethods";
import { CrocoHtmlOptions } from '../../../options';
import { CustomWidgetTagDataConsts } from "../../../extensions/CustomWidgetMethods";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { NgTemplateOutlet } from "@angular/common";
import { HtmlRawTagDataConsts } from "../../../extensions/HtmlRawTagDataConsts";
import { MatTooltip } from "@angular/material/tooltip";
import { SpriteIconPathPipe } from "../../../pipes/sprite-icon-path.pipe";
import { SpriteIdsType } from "../../../../sprites-ids.type";

export const defaultLinkYouTube = "https://www.youtube.com/embed/4CtSAnJDfsI?si=scyBNJa0Hs2t5aLE";
export const defaultLinkVk = "https://vk.com/video_ext.php?oid=-22822305&id=456241864&hd=2";
export const defaultLinkForDownload = "https://storage.yandexcloud.net/mega-academy/presentation.pdf";

@Component({
  selector: 'croco-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FormsModule,
    MatSelect,
    MatOption,
    AddFilesBtnComponent,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MainEditorBlockComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgTemplateOutlet,
    MatTooltip,
    SpriteIconPathPipe,
  ]
})
export class VisualEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('textArea') textArea: ElementRef;

  isLoading = false;
  loadingText = "Идёт загрузка";
  text = '';
  htmlRaw = '';

  alignment = EAlignments.Left;
  textTag = DefaultTags.textTags[0].tag;
  textTagOptions = DefaultTags.textTags
  alignmentOptions = AlignmentsData

  @Input()
  showMarkUp = true;

  tags: TagItem[] = [];
  videoPlayers = ExternalVideoPlayers
  selectedValue: string = null;
  selectedVideoPlayer: string;

  protected readonly ExternalVideoTagDataConsts = ExternalVideoTagDataConsts;
  protected readonly HtmlRawTagDataConsts = HtmlRawTagDataConsts;
  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  @Input()
  useHtmlRaw = true;

  @Input()
  @Output()
  html: string = "";

  isHtmlSet() {
    return this.html.startsWith("<body>");
  }

  clearHtml() {
    this.html = "";
    this.recalculateBodyTags();
  }

  getHtml() {
    this.recalculateHtml();
    return this.html;
  }

  @Output()
  onHtmlChanged = new EventEmitter<string>();

  @Output()
  rendered = new EventEmitter<boolean>();

  bodyTags: HtmlBodyTag[] = [];
  saveBodyTags: HtmlBodyTag[] = [];

  useCustomWidgetsButton = false;

  constructor(
    private readonly _cdref: ChangeDetectorRef,
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) { 

    this.useCustomWidgetsButton = this._options.useCustomWidgetsButton;
  }

  ngAfterViewInit(): void {
    this.rendered.emit(true);
  }

  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  addTagClickHandler(): void {
    let tagDescription = this.tags
      .find(x => x.tag === this.selectedValue);

    let attrs = {};
    let innerHtml = "";

    if (TextTags.allTextTags.includes(tagDescription.tag)) {
      this.addTextTags();
      this.startAddingText();
      return;
    }
    else if (tagDescription.tag == ExternalVideoTagDataConsts.TagName) {
      attrs[ExternalVideoTagDataConsts.VideoTypeAttrName] = this.selectedVideoPlayer;
      attrs[ExternalVideoTagDataConsts.UseResponsiveWrapperAttrName] = false;
      attrs[ExternalVideoTagDataConsts.LinkAttrName] = this.selectedVideoPlayer === ExternalVideoSupportedTypes.Code ? '' :
        this.selectedVideoPlayer === ExternalVideoSupportedTypes.VkVideo
          ? defaultLinkVk
          : defaultLinkYouTube;

      if (this.selectedVideoPlayer === ExternalVideoSupportedTypes.Code) {
        innerHtml = this.htmlRaw
      }
    }
    else if (tagDescription.tag == FileImageTagDataConsts.TagName) {
      attrs[FileImageTagDataConsts.ScreenMediaRequest] = FileImageTagDataConsts.DefaultValueForFileImage;
    }
    else if (tagDescription.tag == DownloadButtonTagDataConsts.TagName) {
      attrs[DownloadButtonTagDataConsts.LinkAttrName] = defaultLinkForDownload
      attrs[DownloadButtonTagDataConsts.TitleAttrName] = 'Скачать'
    }
    else if (tagDescription.tag == ButtonTagDataConsts.TagName) {
      attrs[ButtonTagDataConsts.ClickAttrName] = ''
      attrs[ButtonTagDataConsts.TypeAttrName] = 'button'
      attrs[ButtonTagDataConsts.TextAttrName] = 'Кнопка'
    }
    else if (tagDescription.tag === HtmlRawTagDataConsts.TagName) {
      innerHtml = this.htmlRaw;
    }
    else if (tagDescription.tag == CustomWidgetTagDataConsts.TagName) {
      attrs[CustomWidgetTagDataConsts.TypeAttrName] = 'example-type'
      attrs[CustomWidgetTagDataConsts.DataIdAttrName] = 'example-data-id'
      attrs[CustomWidgetTagDataConsts.WidgetIdAttrName] = 'example-widget-id'
    }
    else if (tagDescription.tag === FileImageTagDataConsts.TagName) {
      attrs[FileImageTagDataConsts.FileIdAttrName] = null;
    }

    this.bodyTags.push({
      tagDescription,
      innerHtml,
      attributes: attrs,
      presentOrEdit: true
    });

    this.htmlRaw = '';
    this.recalculateHtml();
  }

  startAddingText(tag = ''): void {
    this.saveBodyTags = [...this.bodyTags];
    if (tag === 'text') {
      setTimeout(() => {
        this.textArea.nativeElement.focus();
      })
    }
    this.resetTextStyle();
  }

  resetTextStyle(): void {
    this.text = '';
    this.alignment = EAlignments.Left;
    this.textTag = DefaultTags.textTags[0].tag;
  }

  addTextTags() {
    let lines = this.text.split('\n');
    this.bodyTags = [...this.saveBodyTags];
    let tagDescription = this.textTagOptions?.find(x => x.tag === this.textTag);

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 0) {
        this.bodyTags.push({
          tagDescription,
          innerHtml: lines[i],
          attributes: {
            "h-align": `${this.alignment}`
          },
          presentOrEdit: true
        });
        this.recalculateHtml();
      }
    }
  }

  postFilesStartedEventHandler(model: FilePostingStarted) {
    this.loadingText = "Файлы загружаются на сервер";
    this.isLoading = true;
  }

  addTag(tag: HtmlBodyTag) {
    this.bodyTags.push(tag);
    this.recalculateHtml();
  }

  filesTagsReadyHandler(tags: HtmlBodyTag[]) {
    for (let i = 0; i < tags.length; i++) {
      this.bodyTags.push(tags[i]);
    }
    this.recalculateHtml();
    this.isLoading = false;
  }

  drop(event: CdkDragDrop<object[]>) {
    moveItemInArray(this.bodyTags, event.previousIndex, event.currentIndex);
    this.recalculateHtml();
  }

  onTagSavedHandler(tag: HtmlBodyTag) {
    this.recalculateHtml();
  }

  onTagRemovedHandler(index: number) {
    this.bodyTags.splice(index, 1);
    this.recalculateHtml();
  }

  recalculateHtml() {
    let result = BodyTagsExtensions.toHtml(this.bodyTags);
    this.html = XmlExtensions.formatXml("<body>" + result + "</body>");
    this.onHtmlChanged.emit(this.html);
  }

  recalculateBodyTags() {
    this.bodyTags = BodyTagsExtensions.getBodyTags(this.html, this._options);
  }

  selectTag(data: TagItem) {
    this.htmlRaw = '';

    this.selectedValue = data.tag;
    this.startAddingText(data.tag);
  }

  customWidgetsClickHandler() {
    this._options.customWidgetClickHandler(this);
  }

  ngOnInit(): void {
    this.recalculateBodyTags();

    this.tags = DefaultTags.getTags();
    this.selectedValue = this.tags[0].tag;
    this.selectedVideoPlayer = this.videoPlayers[0].type;
  }

  setTagButton(type: string): SpriteIdsType {
    return `tag-button-${type}` as SpriteIdsType
  }

  setAlignButton(type: string): SpriteIdsType {
    return `align-${type}` as SpriteIdsType
  }
}
