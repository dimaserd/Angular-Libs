export interface TagItem {
    tag: string;
    displayValue: string;
}

export interface HtmlBodyTag {
    tagDescription: TagItem;
    innerHtml: string;
    attributes: Object;
    presentOrEdit: boolean;
}
export interface AngularMaterialTableData {
  displayedColumns: string[];
  data: object[];
}

export interface ITagViewOptions {
  useCustomImageUrlRenderer: boolean;
  renderImageUrl(fileId: number, sizeType: string): string;
}