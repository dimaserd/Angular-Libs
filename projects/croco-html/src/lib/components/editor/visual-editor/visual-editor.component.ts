import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
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
import { IVisualEditorLogger } from '../../../services/loggers/IVisualEditorLogger';
import { NullVisualEditorLogger } from '../../../services/loggers/NullVisualEditorLogger';
import { TagChangeDetector } from '../../../services/optimized-change-tracker.service';
import { TagDiff, ChangeType, ChangeSnapshot } from '../../../models/change-tracking-models';
import { EditorUndoRedoService } from '../../../services/editor-undo-redo.service';
import { takeUntil } from 'rxjs';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Input({ required: false })
  showMarkUp = true;

  @Input({ required: false })
  logger: IVisualEditorLogger = new NullVisualEditorLogger();

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

  /** History of change snapshots for diff tracking */
  private historySnapshots: ChangeSnapshot[] = [];
  private maxHistorySize = 100;

  /** Cached last-known bodyTags for diff comparison */
  private lastKnownTags: HtmlBodyTag[] = [];

  /** Destroyed state */
  private destroyed = new EventEmitter<void>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _changeDetector: TagChangeDetector,
    private readonly _undoRedo: EditorUndoRedoService,
    @Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {

    this.useCustomWidgetsButton = this._options.useCustomWidgetsButton;

    // Wire up keyboard shortcuts for undo/redo
    this._undoRedo.canUndoChanged.pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => this._cdr.markForCheck());
    
    this._undoRedo.canRedoChanged.pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => this._cdr.markForCheck());
  }

  ngAfterViewInit(): void {
    this.rendered.emit(true);
  }

  ngOnDestroy(): void {
    this.destroyed.emit();
    this.destroyed.complete();
  }

  /**
   * Handle keyboard shortcuts for undo/redo:
   * - Ctrl+Z / Cmd+Z: Undo
   * - Ctrl+Y / Cmd+Y: Redo
   * - Ctrl+Shift+Z / Cmd+Shift+Z: Redo (alternative)
   */
  onKeyDown(event: KeyboardEvent): void {
    const isCtrl = event.ctrlKey || event.metaKey; // metaKey = Cmd on Mac
    
    if (!isCtrl) return;
    
    if (event.key === 'z' && !event.shiftKey) {
      // Ctrl+Z or Cmd+Z: Undo
      event.preventDefault();
      this.undo();
    } else if (event.key === 'y' || (event.key === 'z' && event.shiftKey)) {
      // Ctrl+Y or Ctrl+Shift+Z or Cmd+Shift+Z: Redo
      event.preventDefault();
      this.redo();
    }
  }

  resetTextStyle(): void {
    this.text = '';
    this.alignment = TextAlignment.Left;
    this.textTag = DefaultTags.textTags[0].tag;
    this._cdr.markForCheck();
  }

  drop(event: CdkDragDrop<HtmlBodyTag[]>) {
    // Save state before mutation for undo
    this._undoRedo.pushState(this.bodyTags, this.html, `Move tag #${event.previousIndex} → #${event.currentIndex}`);
    
    const oldIndex = event.previousIndex;
    const newIndex = event.currentIndex;
    
    moveItemInArray(this.bodyTags, oldIndex, newIndex);
    
    // Detect the move diff
    const movedTag = this.bodyTags[newIndex];
    const diff = this._changeDetector.detectDiff(
      this._undoRedo.getUndoStack()[this._undoRedo.getUndoStack().length - 1]?.bodyTags[oldIndex],
      movedTag,
      newIndex,
      ChangeType.Moved
    );
    
    this.recalculateHtml(diff);
  }

  addTag(tag: HtmlBodyTag) {
    this.addTags([tag]);
  }

  addTags(tags: HtmlBodyTag[]) {
    // Save state before mutation for undo
    const tagCount = this.bodyTags.length;
    this._undoRedo.pushState(this.bodyTags, this.html, `Add ${tags.length} tag(s)`);

    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];
      this.bodyTags.push(tag);
    }

    const indices: number[] = tags.map((_, i) => tagCount + i);

    // Generate diffs for all added tags
    const diffs: TagDiff[] = tags.map((tag, i) => 
      this._changeDetector.detectDiff(
        null, tag, indices[i], ChangeType.Added
      )
    ).filter(Boolean) as TagDiff[];

    this.recalculateHtml(diffs.length === 1 ? diffs[0] : null);
    this.logger.onAdd(tags);
  }

  onTagChangedHandler(data: HtmlBodyTag, index: number) {
    const existingTag = this.bodyTags[index];

    // Save state before mutation for undo
    this._undoRedo.pushState(this.bodyTags, this.html, `Update tag #${index}`);

    // Record old tag before mutation
    const oldTag = { ...existingTag, attributes: { ...existingTag.attributes } };
    this.bodyTags[index] = data;

    // Detect structured diff
    const diff = this._changeDetector.detectDiff(
      oldTag, data, index, ChangeType.Updated
    );

    this.recalculateHtml(diff);
    this.logger.onChange(data, index);

    if (diff && this.logger.onTagDiff) {
      this.logger.onTagDiff(diff);
    }
  }

  onTagRemovedHandler(index: number) {
    // Save state before mutation for undo
    this._undoRedo.pushState(this.bodyTags, this.html, `Remove tag #${index}`);

    const removedTag = this.bodyTags[index];
    this.bodyTags.splice(index, 1);
    this.saveBodyTags = [...this.bodyTags];
    
    // Detect removal diff
    const diff = this._changeDetector.detectDiff(
      removedTag, null, index, ChangeType.Removed
    );

    this.recalculateHtml(diff);
    
    // Fix: wire up logger.onRemove (was previously not called)
    this.logger.onRemove(index);

    if (diff && this.logger.onTagDiff) {
      this.logger.onTagDiff(diff);
    }
  }

  /**
   * Recalculates HTML from bodyTags and emits the result.
   * @param diff Optional structured diff of what changed (enables downstream consumers to apply incremental updates)
   */
  recalculateHtml(diff?: TagDiff | TagDiff[] | null): void {
    let result = BodyTagsExtensions.bodyTagsToHtml(this.bodyTags, this._options);
    this.html = XmlExtensions.formatXml("<body>" + result + "</body>");
    this.onHtmlChanged.emit(this.html);

    // Optimisation: update lastKnownTags only for changed indices
    if (diff) {
      const diffs = Array.isArray(diff) ? diff : [diff];
      for (const d of diffs) {
        if (d?.changeType === ChangeType.Added || d?.changeType === ChangeType.Updated) {
          this.lastKnownTags[d.index] = d.newTag;
        } else if (d?.changeType === ChangeType.Removed) {
          this.lastKnownTags.splice(d.index, 1);
        } else if (d?.changeType === ChangeType.Moved) {
          this.rebuildLastKnownTags();
          break;
        }
      }
    } else {
      this.rebuildLastKnownTags();
    }

    this._cdr.markForCheck();
  }

  /**
   * Rebuilds the entire lastKnownTags cache from current bodyTags.
   * Used for moves or when diff tracking is unreliable.
   */
  private rebuildLastKnownTags(): void {
    this.lastKnownTags = [...this.bodyTags];
  }

  recalculateBodyTags() {
    this.bodyTags = BodyTagsExtensions.getBodyTags(this.html, this._options);
    this.saveBodyTags = [...this.bodyTags];
    this.lastKnownTags = [...this.bodyTags];
    
    // Clear undo state on full reload
    this._undoRedo.clear();
    
    this._options.onBodyTagsRecalculated?.(this.saveBodyTags)
    this._cdr.markForCheck();
  }

  /**
   * Undo the last editor action (Ctrl+Z).
   * Restores bodyTags and html from the previous state.
   */
  undo(): boolean {
    const undoStackBefore = this._undoRedo.getUndoStack().length;
    if (undoStackBefore === 0) return false;

    const snapshot = this._undoRedo.undo();
    
    // Apply the snapshot state
    const prevState = this._undoRedo.getUndoStack().length > 0
      ? this._undoRedo.getUndoStack()[this._undoRedo.getUndoStack().length - 1]
      : null;

    if (prevState) {
      this.bodyTags = prevState.bodyTags;
      this.html = prevState.html;
      this.saveBodyTags = [...this.bodyTags];
      this.lastKnownTags = [...this.bodyTags];
      this.onHtmlChanged.emit(this.html);
      this.logger.onUndo?.(prevState);
      this._cdr.markForCheck();
      return true;
    }

    return false;
  }

  /**
   * Redo the last undone action (Ctrl+Y or Ctrl+Shift+Z).
   * Restores bodyTags and html from the next state.
   */
  redo(): boolean {
    const redoStack = this._undoRedo.getRedoStack();
    if (redoStack.length === 0) return false;

    const snapshot = this._undoRedo.redo();
    
    // Apply the redo state
    const nextState = this._undoRedo.getUndoStack().length > 0
      ? this._undoRedo.getUndoStack()[this._undoRedo.getUndoStack().length - 1]
      : null;

    if (nextState) {
      this.bodyTags = nextState.bodyTags;
      this.html = nextState.html;
      this.saveBodyTags = [...this.bodyTags];
      this.lastKnownTags = [...this.bodyTags];
      this.onHtmlChanged.emit(this.html);
      this.logger.onRedo?.(nextState);
      this._cdr.markForCheck();
      return true;
    }

    return false;
  }

  /**
   * Check if undo is currently available.
   */
  isUndoAvailable(): boolean {
    return this._undoRedo.canUndo();
  }

  /**
   * Check if redo is currently available.
   */
  isRedoAvailable(): boolean {
    return this._undoRedo.canRedo();
  }

  /**
   * Returns the current change history snapshot for debugging.
   */
  getChangeHistory(): ChangeSnapshot[] {
    return this._undoRedo.getUndoStack();
  }

  /**
   * trackBy function for ngFor to use trackingId instead of object reference.
   * Prevents DOM re-rendering when tags haven't actually moved.
   */
  trackByTrackingId(index: number, tag: HtmlBodyTag): string {
    return tag.trackingId;
  }

  selectTag(data: TagItem) {
    this.htmlRaw = '';
    this.selectedValue = data.tag;
    this.imageMode = null;

    if (this.isTagRequiringForm()) {
      if (data.tag === 'text') {
        this.resetTextStyle();
      }
      else if (data.tag === ExternalVideoTagDataConsts.TagName) {
        this.selectedVideoPlayer = this.videoPlayers[0].type;
      }
      this._cdr.markForCheck();
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

      this.addTag(tag);
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

      const tags: HtmlBodyTag[] = [];

      fileIdsString.forEach(fileId => {
        const tag: HtmlBodyTag = {
          trackingId: crypto.randomUUID(),
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

        tags.push(tag);
      });

      this.addTags(tags);
      this.resetTagForm();
    }
  }

  addTextTag(): void {
    if (!this.text || this.text.trim().length === 0) {
      return;
    }

    let lines = this.text.split('\n');
    let tagDescription = this.textTagOptions?.find(x => x.tag === this.textTag);

    const tags: HtmlBodyTag[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 0) {
        tags.push({
          trackingId: crypto.randomUUID(),
          tagDescription,
          innerHtml: line,
          attributes: {
            [TextTagDataConsts.HAlign]: `${this.alignment}`
          }
        });
      }
    }

    this.addTags(tags);
  }

  addExternalVideoTag(): void {
    const tagName = ExternalVideoTagDataConsts.TagName;

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      const tag = tagService.getDefaultValue({
        htmlRaw: this.htmlRaw,
        selectedVideoPlayer: this.selectedVideoPlayer
      });

      this.addTag(tag);
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

      this.addTag(tag);
    }
  }

  resetTagForm(): void {
    this.selectedValue = null;
    this.htmlRaw = '';
    this.text = '';
    this.imageMode = null;
    this.resetTextStyle();
    this.isTagAdditionStarted = false;

    this._cdr.markForCheck();
  }

  addRegularTag(): void {
    if (!this.selectedValue) {
      return;
    }

    const tagName = this.selectedValue;

    const tags: HtmlBodyTag[] = [];

    if (BodyTagsExtensions.hasTagService(tagName, this._options)) {
      const tagService = BodyTagsExtensions.getTagService(tagName, this._options);
      let tag = tagService.getDefaultValue({
        htmlRaw: '',
        selectedVideoPlayer: null
      });

      tags.push(tag);
      this.resetTagForm();
    } else {
      alert(`Сервис для тега ${tagName} не зарегистрирован.`);
    }

    this.addTags(tags);
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

    this.tags = DefaultTags.getTags(this._options);
    this.selectedVideoPlayer = this.videoPlayers[0].type;

    this._cdr.markForCheck();
  }

  setTagButton(tagName: string): SpriteIdsType {
    return `tag-button-${tagName}` as SpriteIdsType
  }

  setAlignButton(type: string): SpriteIdsType {
    return `align-${type}` as SpriteIdsType
  }
}
