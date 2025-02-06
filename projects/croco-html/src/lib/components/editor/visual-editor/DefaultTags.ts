import { HtmlRawTagDataConsts } from '../../../extensions/HtmlRawTagDataConsts';
import { CustomWidgetTagDataConsts, ExternalVideoTagDataConsts, FileImageTagDataConsts } from '../../../extensions';
import { TagItem } from '../../../models/models';
import { DownloadButtonTagDataConsts } from "../../../extensions/DownloadButtonMethods";
import { ButtonTagDataConsts } from "../../../extensions/ButtonMethods";

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
    { tag: HtmlRawTagDataConsts.TagName, displayValue: 'Разметка' },
    { tag: 'text', displayValue: 'Текст' },
  ];

  static getTags(): TagItem[] {
    return [...DefaultTags.tags];
  }
}
