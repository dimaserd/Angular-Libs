import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BodyTagsExtensions } from '../../../extensions/BodyTagsExtensions';
import { HtmlRawTagDataConsts } from '../../../extensions/HtmlRawTagDataConsts';
import { FileImageTagDataConsts } from '../../../extensions/ImageMethods';
import { TextMethods } from '../../../extensions/TextMethods';
import { ExternalVideoTagDataConsts, ExternalVideoSupportedTypes } from '../../../extensions/VideoMethods';
import { XmlExtensions } from '../../../extensions/XmlExtensions';
import { TagItem, HtmlBodyTag } from '../../../models/models';
import { FilePostingStarted } from '../../upload-files-btn/upload-files-btn.component';

export class DefaultTags{
  static tags:TagItem[] = [
    { tag: FileImageTagDataConsts.TagName, displayValue: 'Изображение' },
    { tag: ExternalVideoTagDataConsts.TagName, displayValue: 'Внешнее видео Youtube' },
    { tag: 'text', displayValue: 'Текст' },
    { tag: 'h1', displayValue: 'Заголовок 1 уровня' },
    { tag: 'h2', displayValue: 'Заголовок 2 уровня' },
    { tag: 'h3', displayValue: 'Заголовок 3 уровня' },
    { tag: 'h4', displayValue: 'Заголовок 4 уровня' },
    { tag: 'h5', displayValue: 'Заголовок 5 уровня' },
    { tag: 'h6', displayValue: 'Заголовок 6 уровня' },
  ];

  static htmlRawTag:TagItem = {
    tag: HtmlRawTagDataConsts.TagName, displayValue: 'Html разметка'
  }

  static getTags(useHtmlRaw:boolean):TagItem[]{
    var result = [...DefaultTags.tags];

    if(useHtmlRaw){
      result.push(DefaultTags.htmlRawTag);
    }

    return result;
  }
}

@Component({
  selector: 'croco-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit, AfterViewInit {

  isLoading = false;
  loadingText = "Идёт загрузка";

  @Input()
  showMarkUp = true;

  myForm = new FormGroup({
    "html": new FormControl(),
  });

  tags: TagItem[] = [];

  selectedValue: string;

  @Input()
  useHtmlRaw = false;

  @Input()
  @Output()
  html: string = "";

  isHtmlSet(){
    return this.html.startsWith("<body>");
  }

  clearHtml(){
    this.html = "";
    this.recalculateBodyTags();
  }

  getHtml(){
    this.recalculateHtml();
    return this.html;
  }

  @Output()
  onHtmlChanged = new EventEmitter<string>();

  @Output()
  rendered = new EventEmitter<boolean>();

  bodyTags: HtmlBodyTag[] = [];

  constructor(
    private _cdref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.rendered.emit(true);
  }

  ngAfterContentChecked(): void {
    this._cdref.detectChanges();
  }

  addTag(): void {
    let tagDescription = this.tags
      .find(x => x.tag === this.selectedValue);

    let attrs = {};
    let innerHtml = "";

    if(TextMethods.textTags.includes(tagDescription.tag)){
      attrs["h-align"] = "left";
      innerHtml = "Введите ваш текст";
    }
    else if(tagDescription.tag == ExternalVideoTagDataConsts.TagName){
      attrs[ExternalVideoTagDataConsts.VideoTypeAttrName] = ExternalVideoSupportedTypes.Youtube;
      attrs[ExternalVideoTagDataConsts.LinkAttrName] = null;
    }
    else{
      attrs[FileImageTagDataConsts.FileIdAttrName] = null;
    }

    this.bodyTags.push({
      tagDescription,
      innerHtml,
      attributes: attrs,
      presentOrEdit: true
    });

    this.recalculateHtml();
  }

  postFilesStartedEventHandler(model:FilePostingStarted){
    this.loadingText = "Файлы загружаются на сервер";
    this.isLoading = true;
  }

  addTagCustom(tag: HtmlBodyTag){
    this.bodyTags.push(tag);
    this.recalculateHtml();
  }

  filesTagsReadyHandler(tags: HtmlBodyTag[]){
    for(let i = 0; i < tags.length; i++){
      this.bodyTags.push(tags[i]);
    }
    this.recalculateHtml();

    this.isLoading = false;
  }

  drop(event: CdkDragDrop<object[]>) {
    moveItemInArray(this.bodyTags, event.previousIndex, event.currentIndex);
    this.recalculateHtml();
  }

  onTagSavedHandler(tag: HtmlBodyTag){
    this.recalculateHtml();
  }

  onTagRemovedHandler(index: number){
    this.bodyTags.splice(index, 1);
    this.recalculateHtml();
  }

  recalculateHtml(){
    let result = BodyTagsExtensions.toHtml(this.bodyTags);
    this.html = XmlExtensions.formatXml("<body>" + result + "</body>");
    this.onHtmlChanged.emit(this.html);
  }

  recalculateBodyTags(){
    this.bodyTags = BodyTagsExtensions.getBodyTags(this.html);
  }

  ngOnInit(): void {
    this.recalculateBodyTags();

    this.tags = DefaultTags.getTags(this.useHtmlRaw);
    this.selectedValue = this.tags[0].tag;
  }
}
