import { HtmlRawTagDataConsts } from '../../../extensions/HtmlRawTagDataConsts';
import { FileImageTagDataConsts } from '../../../extensions';
import { TagItem } from '../../../models/models';
import {ExternalVideoTagDataConsts} from "../../../extensions";
import {DownloadButtonTagDataConsts} from "../../../extensions/DownloadButtonMethods";
import {CustomButtonTagDataConsts} from "../../../extensions/CustomButtonMethods";

export class DefaultTags {

  static textTags: TagItem[] = [
    { tag: 'text', displayValue: 'Текст' },
    { tag: 'h1', displayValue: 'Заголовок 1 уровня' },
    { tag: 'h2', displayValue: 'Заголовок 2 уровня' },
    { tag: 'h3', displayValue: 'Заголовок 3 уровня' },
    { tag: 'h4', displayValue: 'Заголовок 4 уровня' },
    { tag: 'h5', displayValue: 'Заголовок 5 уровня' },
    { tag: 'h6', displayValue: 'Заголовок 6 уровня' },
  ]

  static tags: TagItem[] = [
    { tag: FileImageTagDataConsts.TagName, displayValue: 'Изображение' },
    { tag: ExternalVideoTagDataConsts.TagName, displayValue: 'Внешнее видео' },
    { tag: DownloadButtonTagDataConsts.TagName, displayValue: 'Кнопка для скачивания' },
    { tag: CustomButtonTagDataConsts.TagName, displayValue: 'Кнопка для клика' },
    ...DefaultTags.textTags
  ];

  static htmlRawTag: TagItem = {
    tag: HtmlRawTagDataConsts.TagName, displayValue: 'Html разметка'
  };

  static getTags(useHtmlRaw: boolean): TagItem[] {
    var result = [...DefaultTags.tags];

    if (useHtmlRaw) {
      result.push(DefaultTags.htmlRawTag);
    }

    return result;
  }
}
