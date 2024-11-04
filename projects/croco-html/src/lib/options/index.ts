import {CustomWidgetTagData, IMediaRequest} from "../extensions";
import {Type} from "@angular/core";
import {BaseCustomWidgetComponent} from "../components/xml-tags/xml-tag-custom-widget/base-custom-widget.component";

export interface CrocoHtmlOptions {
  publicImageResizedUrlFormat: string;
  globalMediaRequests?: IMediaRequest[];
  dynamicComponent?: Type<BaseCustomWidgetComponent<CustomWidgetTagData>>;
}
