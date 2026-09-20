export interface TagItem {
  /**
   * Название тега
   */
  tag: string;
  displayValue: string;
  isCustom: boolean;
}

export interface HtmlBodyTag {
  /**
   * Уникальный идентификатор для отслеживания изменений.
   */
  trackingId: string;
  tagDescription: TagItem;
  innerHtml: string;
  attributes: Object;
}

export interface BaseApiResponse {
  isSucceeded: boolean;
  message: string;
}