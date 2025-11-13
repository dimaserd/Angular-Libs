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
} from '../../../extensions';
import {
  ExternalVideoTagDataConsts,
} from '../../../extensions';
import { XmlExtensions } from '../../../extensions';
import { TagItem, HtmlBodyTag } from '../../../models/models';
import { DefaultTags } from './DefaultTags';
import { AlignmentsData } from "./DefaultAligments";
import { CrocoHtmlOptionsToken } from '../../../consts';
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
import { MatIcon } from '@angular/material/icon';
import { CrocoHtmlOptions } from '../../../options';
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { NgTemplateOutlet } from "@angular/common";
import { MatTooltip } from "@angular/material/tooltip";
import { SpriteIconPathPipe } from "../../../pipes/sprite-icon-path.pipe";
import { SpriteIdsType } from "../../../../sprites-ids.type";
import { HtmlRawTagDataConsts, TextAlignment, TextTagDataConsts } from '../../../tag-services';
import { CustomWidgetIconComponent } from "./components/custom-widget-icon/custom-widget-icon.component";
import { FileImageTagDataConsts } from '../../../extensions';
import { UploadFilesBtnComponent } from '../../upload-files-btn/upload-files-btn.component';

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
    CustomWidgetIconComponent,
    MatIcon,
    UploadFilesBtnComponent
  ]
})
export class VisualEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('imageUploadBtn') imageUploadBtn: UploadFilesBtnComponent;

  isLoading = false;
  loadingText = "Идёт загрузка";
  text = '';
  htmlRaw = '';

  alignment = TextAlignment.Left;
  textTag = DefaultTags.textTags[0].tag;
  textTagOptions = DefaultTags.textTags
  alignmentOptions = AlignmentsData
  isTagAdditionStarted = false

  @Input()
  showMarkUp = true;

  tags: TagItem[] = [];
  videoPlayers = ExternalVideoPlayers
  selectedValue: string = null;
  selectedVideoPlayer: string;
  imageMode: 'select' | 'upload' | null = null;

  protected readonly ExternalVideoTagDataConsts = ExternalVideoTagDataConsts;
  protected readonly HtmlRawTagDataConsts = HtmlRawTagDataConsts;
  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;
  protected readonly FileImageTagDataConsts = FileImageTagDataConsts;

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

  resetTextStyle(): void {
    this.text = '';
    this.alignment = TextAlignment.Left;
    this.textTag = DefaultTags.textTags[0].tag;
  }

  drop(event: CdkDragDrop<HtmlBodyTag[]>) {
    moveItemInArray(this.bodyTags, event.previousIndex, event.currentIndex);
    this.recalculateHtml();
  }

  addTag(tag: HtmlBodyTag) {
    this.bodyTags.push(tag);
    this.recalculateHtml();
  }

  onTagChangedHandler(data: HtmlBodyTag, index: number) {
    this.bodyTags[index] = data;
    this.recalculateHtml();
  }

  onTagRemovedHandler(index: number) {
    this.bodyTags.splice(index, 1);
    this.saveBodyTags = [...this.bodyTags];
    this.recalculateHtml();
  }

  recalculateHtml() {
    let result = BodyTagsExtensions.bodyTagsToHtml(this.bodyTags, this._options);
    this.html = XmlExtensions.formatXml("<body>" + result + "</body>");
    this.onHtmlChanged.emit(this.html);
  }

  recalculateBodyTags() {
    this.bodyTags = BodyTagsExtensions.getBodyTags(this.html, this._options);
    this.saveBodyTags = [...this.bodyTags];
  }

  selectTag(data: TagItem) {
    this.htmlRaw = '';
    this.selectedValue = data.tag;
    this.imageMode = null;

    if (this.isTagRequiringForm()) {
      if (data.tag === 'text') {
        this.resetTextStyle();
      } else if (data.tag === ExternalVideoTagDataConsts.TagName) {
        this.selectedVideoPlayer = this.videoPlayers[0].type;
      } else if (data.tag === FileImageTagDataConsts.TagName) {
        return;
      }
      return;
    }

    this.addRegularTag();
  }

  isTagRequiringForm(): boolean {
    return this.selectedValue === 'text' ||
           this.selectedValue === ExternalVideoTagDataConsts.TagName ||
           this.selectedValue === HtmlRawTagDataConsts.TagName ||
           this.selectedValue === FileImageTagDataConsts.TagName;
  }

  addTagWithForm(): void {
    if (!this.selectedValue) {
      return;
    }

    if (this.selectedValue === 'text') {
      this.addTextTag();
    } else if (this.selectedValue === ExternalVideoTagDataConsts.TagName) {
      this.addExternalVideoTag();
    } else if (this.selectedValue === HtmlRawTagDataConsts.TagName) {
      this.addHtmlRawTag();
    } else if (this.selectedValue === FileImageTagDataConsts.TagName) {
      if (this.imageMode === 'select') {
        this.selectExistingImage();
      } else if (this.imageMode === 'upload') {
        return;
      }
    }

    this.resetTagForm();
  }

  selectExistingImage(): void {
    const tagName = FileImageTagDataConsts.TagName;

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      let tag = tagService.getDefaultValue({
        htmlRaw: '',
        selectedVideoPlayer: null
      });

      this.bodyTags.push(tag);
      this.recalculateHtml();
      this.resetTagForm();
    }
  }

  uploadNewImages(): void {
    if (this.imageUploadBtn) {
      this.imageUploadBtn.clickFileInput();
    }
  }

  onImageFilesUploaded(fileIds: string[] | number[]): void {
    if (fileIds && fileIds.length > 0) {
      const fileIdsString = fileIds.map(id => typeof id === 'number' ? id.toString() : id);

      fileIdsString.forEach(fileId => {
        const tag: HtmlBodyTag = {
          tagDescription: {
            tag: FileImageTagDataConsts.TagName,
            displayValue: "Изображение",
            isCustom: false
          },
          attributes: {
            [FileImageTagDataConsts.FileIdAttrName]: fileId,
            [FileImageTagDataConsts.ScreenMediaRequest]: FileImageTagDataConsts.DefaultValueForFileImage
          },
          innerHtml: ""
        };

        this.bodyTags.push(tag);
      });

      this.recalculateHtml();
      this.resetTagForm();
    }
  }

  addTextTag(): void {
    if (!this.text || this.text.trim().length === 0) {
      return;
    }

    let lines = this.text.split('\n');
    let tagDescription = this.textTagOptions?.find(x => x.tag === this.textTag);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 0) {
        this.bodyTags.push({
          tagDescription,
          innerHtml: line,
          attributes: {
            [TextTagDataConsts.HAlign]: `${this.alignment}`
          }
        });
      }
    }

    this.recalculateHtml();
  }

  addExternalVideoTag(): void {
    const tagName = ExternalVideoTagDataConsts.TagName;

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      let tag = tagService.getDefaultValue({
        htmlRaw: this.htmlRaw,
        selectedVideoPlayer: this.selectedVideoPlayer
      });

      this.bodyTags.push(tag);
      this.recalculateHtml();
    }
  }

  addHtmlRawTag(): void {
    const tagName = HtmlRawTagDataConsts.TagName;

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      let tag = tagService.getDefaultValue({
        htmlRaw: this.htmlRaw,
        selectedVideoPlayer: null
      });

      this.bodyTags.push(tag);
      this.recalculateHtml();
    }
  }

  resetTagForm(): void {
    this.selectedValue = null;
    this.htmlRaw = '';
    this.text = '';
    this.imageMode = null;
    this.resetTextStyle();
    this.isTagAdditionStarted = false;
  }

  addRegularTag(): void {
    if (!this.selectedValue) {
      return;
    }

    const tagName = this.selectedValue;

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      let tag = tagService.getDefaultValue({
        htmlRaw: '',
        selectedVideoPlayer: null
      });

      this.bodyTags.push(tag);
      this.recalculateHtml();
      this.resetTagForm();
    } else {
      alert(`Сервис для тега ${tagName} не зарегистрирован.`);
    }
  }

  isDefinedCustomWidget(tagName: string): boolean {
    if (this._options.definedCustomTags.hasOwnProperty(tagName)) {
      return true;
    }

    return false;
  }

  customWidgetsClickHandler() {
    this._options.customWidgetClickHandler(this);
  }

  ngOnInit(): void {
    this.recalculateBodyTags();

    this.tags = DefaultTags.getTags();
    this.selectedVideoPlayer = this.videoPlayers[0].type;
  }

  setTagButton(tagName: string): SpriteIdsType {
    return `tag-button-${tagName}` as SpriteIdsType
  }

  setAlignButton(type: string): SpriteIdsType {
    return `align-${type}` as SpriteIdsType
  }
}
