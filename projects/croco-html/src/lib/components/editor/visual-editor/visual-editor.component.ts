import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BodyTagsExtensions } from '../../../extensions/BodyTagsExtensions';
import { FileImageTagDataConsts } from '../../../extensions/ImageMethods';
import { TextMethods } from '../../../extensions/TextMethods';
import { ExternalVideoTagDataConsts, ExternalVideoSupportedTypes } from '../../../extensions/VideoMethods';
import { XmlExtensions } from '../../../extensions/XmlExtensions';
import { TagItem, HtmlBodyTag } from '../../../models/models';
import { FilePostingStarted } from '../../upload-files-btn/upload-files-btn.component';
import { DefaultTags } from './DefaultTags';

@Component({
  selector: 'croco-visual-editor',
  templateUrl: './visual-editor.component.html',
  styleUrls: ['./visual-editor.component.css']
})
export class VisualEditorComponent implements OnInit, AfterViewInit {

  isLoading = false;
  loadingText = "Идёт загрузка";
  isActiveAddText = false;
  text = '';

  @Input()
  showMarkUp = true;

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
  saveBodyTags: HtmlBodyTag[] = [];

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

    this.recalculateBodyTags();
  }
  addText(): void {
    this.isActiveAddText = !this.isActiveAddText;
    this.saveBodyTags =  this.isActiveAddText ? JSON.parse(JSON.stringify(this.bodyTags)) : []
  }

  modelChanged() {
    let lines = this.text.split('\n');
    this.bodyTags = JSON.parse(JSON.stringify(this.saveBodyTags));
    let tagDescription = this.tags
      .find(x => x.tag === 'text');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 0) {
        this.bodyTags.push({
          tagDescription,
          innerHtml: lines[i],
          attributes: {
            "h-align": "left"
          },
          presentOrEdit: true
        });
        this.recalculateHtml();
      }

    }

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
    this.bodyTags = BodyTagsExtensions.getBodyTags(this.html, {useCustomDomain: false, domain: ""});
  }

  ngOnInit(): void {
    this.recalculateBodyTags();

    this.tags = DefaultTags.getTags(this.useHtmlRaw);
    this.selectedValue = this.tags[0].tag;
  }
}
