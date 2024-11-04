import {CustomWidgetTagData, IMediaRequest} from "../extensions";
import {Type} from "@angular/core";

export interface CrocoHtmlOptions {
  publicImageResizedUrlFormat: string;
  globalMediaRequests?: IMediaRequest[];
  dynamicComponent?: Type<any>;
}
