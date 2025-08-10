import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";


export interface IMarkUpTagService {
  /**
   * Название тега
   */
  tagName: string;

  /**
   * Описание тега
   */
  shortDescription: string;

  /**
   * Функция для конвертации модели редактора в Html строку разметки
   * @param bodyTag тег
   * @returns
   */
  bodyTagToHtmlStringConverter: (bodyTag: HtmlBodyTag) => string;

  extractBlockFromHtmlElement: (elem: HTMLElement, options: CrocoHtmlOptions) => InterfaceBlock;

  /**
   * Конвертация блока интерфейса в модель тега для редактора
   * @param data
   * @returns
   */
  toBodyTag: (data: InterfaceBlock) => HtmlBodyTag;
}
