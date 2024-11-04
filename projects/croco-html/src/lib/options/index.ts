import {IMediaRequest} from "../extensions";
import {Type} from "@angular/core";

export interface CrocoHtmlOptions {
  publicImageResizedUrlFormat: string;
  globalMediaRequests?: IMediaRequest[];

  /**
   * Компонент для рендера кастомных виджетов
   */
  customWidgetRendererComponent?: Type<any>;
}
