export interface TagItem {
  /**
   * Название тега
   */
  tag: string;
  displayValue: string;
  isCustom: boolean;
}

export interface HtmlBodyTag {
  tagDescription: TagItem;
  innerHtml: string;
  attributes: Object;
  presentOrEdit: boolean;
}

export interface BaseApiResponse {
  isSucceeded: boolean;
  message: string;
}