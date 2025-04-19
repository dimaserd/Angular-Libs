import { HtmlRawTagDataConsts } from '../../../extensions/HtmlRawTagDataConsts';
import { CustomWidgetTagDataConsts, ExternalVideoTagDataConsts, FileImageTagDataConsts } from '../../../extensions';
import { TagItem } from '../../../models/models';
import { DownloadButtonTagDataConsts } from "../../../extensions/DownloadButtonMethods";
import { ButtonTagDataConsts } from "../../../extensions/ButtonMethods";

export class DefaultTags {

  static textTags: TagItem[] = [
    { tag: 'text', displayValue: 'T', isCustom: false },
    { tag: 'h1', displayValue: 'H1', isCustom: false },
    { tag: 'h2', displayValue: 'H2', isCustom: false },
    { tag: 'h3', displayValue: 'H3', isCustom: false },
    { tag: 'h4', displayValue: 'H4', isCustom: false },
    { tag: 'h5', displayValue: 'H5', isCustom: false },
    { tag: 'h6', displayValue: 'H6', isCustom: false },
  ]

  static tags: TagItem[] = [
    { tag: FileImageTagDataConsts.TagName, displayValue: 'Изображение', isCustom: false },
    { tag: ExternalVideoTagDataConsts.TagName, displayValue: 'Видео', isCustom: false },
    { tag: DownloadButtonTagDataConsts.TagName, displayValue: 'Кнопка для скачивания', isCustom: false },
    { tag: ButtonTagDataConsts.TagName, displayValue: 'Кнопка', isCustom: false },
    { tag: CustomWidgetTagDataConsts.TagName, displayValue: 'Виджет', isCustom: false },
    { tag: HtmlRawTagDataConsts.TagName, displayValue: 'Разметка', isCustom: false },
    { tag: 'text', displayValue: 'Текст', isCustom: false },
  ];

  static getTags(): TagItem[] {
    return [...DefaultTags.tags];
  }
}
