import { HtmlRawTagDataConsts } from '../../../extensions/HtmlRawTagDataConsts';
import { FileImageTagDataConsts } from '../../../extensions';
import { TagItem } from '../../../models/models';
import {ExternalVideoTagDataConsts} from "../../../extensions";
import {DownloadButtonTagDataConsts} from "../../../extensions/DownloadButtonMethods";
import {ButtonTagDataConsts} from "../../../extensions/ButtonMethods";
import {CustomWidgetTagDataConsts} from "../../../extensions";

export class DefaultTags {

  static textTags: TagItem[] = [
    { tag: 'text', displayValue: 'T' },
    { tag: 'h1', displayValue: 'H1' },
    { tag: 'h2', displayValue: 'H2' },
    { tag: 'h3', displayValue: 'H3' },
    { tag: 'h4', displayValue: 'H4' },
    { tag: 'h5', displayValue: 'H5' },
    { tag: 'h6', displayValue: 'H6' },
  ]

  static tags: TagItem[] = [
    { tag: FileImageTagDataConsts.TagName, displayValue: 'Изображение' },
    { tag: ExternalVideoTagDataConsts.TagName, displayValue: 'Видео' },
    { tag: DownloadButtonTagDataConsts.TagName, displayValue: 'Кнопка для скачивания' },
    { tag: ButtonTagDataConsts.TagName, displayValue: 'Кнопка' },
    { tag: CustomWidgetTagDataConsts.TagName, displayValue: 'Виджет' },
    // ...DefaultTags.textTags /*на картинке нет этих тэгев */
  ];

  static htmlRawTag: TagItem = {
    tag: HtmlRawTagDataConsts.TagName, displayValue: 'Разметка'
  };

  static getTags(useHtmlRaw: boolean): TagItem[] {
    var result = [...DefaultTags.tags];

    if (useHtmlRaw) {
      result.push(DefaultTags.htmlRawTag);
    }

    return result;
  }
}
