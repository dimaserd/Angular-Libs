import { Type } from "@angular/core";
import { IImageMediaRequest } from "../models";
import { VisualEditorComponent } from "../components";
import { IMarkUpTagService } from "../tag-services";

export interface CrocoHtmlOptions {

  /**
   * Опции для отображения изображений.
   */
  imageOptions: CrocoHtmlImageOptions;

  /**
   * Компонент для рендера кастомных виджетов
   */
  customWidgetRendererComponent?: Type<any>;

  /**
   * Использовать кнопку для отрисовки кастомных виджетов
   */
  useCustomWidgetsButton: boolean;

  /**
   * Показывать кнопку для запуска настроек
   */
  showSettingsButton: boolean;

  /**
   * Кастомные объявленные теги
   */
  definedCustomTags: { [id: string]: IMarkUpTagService; };

  /**
   * Рендеры для кастомных тегов.
   */
  definedCustomTagViewRenderers: { [id: string] : ICustomTagViewRender }

  /**
   * Обработчик нажатия на кнопку кастомных виджетов
   * @returns 
   */
  customWidgetClickHandler: (editor: VisualEditorComponent) => void;
}

export interface ICustomTagViewRender {

  /**
   * Компонент для визуального редактора croco-html-custom-widget-editor
   * Должен содержать инпуты
   * tagEditor: ISingleTagVisualEditor
   * presentOrEdit: boolean
   */
  editorComponent?: Type<any>;

  /**
   * Иконка в визуальном редакторе croco-html-custom-widget-icon
   */
  iconComponent?: Type<any>;

  /**
   * Компонент для отрисовки на интерфейсе croco-html-defined-custom-tag-view.
   * Должен содержать input({required: true}) data: InterfaceBlock
   */
  viewComponent?: Type<any>;
}

export interface CrocoHtmlImageOptions {
    /**
   * Формат сслыки для показа изображений из публичных файлов.
   * Содержит переменные: {sizeType} - тип размера, {fileId} - идентификатор изображения.
   */
  publicImageResizedUrlFormat: string;

  /**
   * Формат сслыки для показа изображений из приватный файлов.
   * Содержит переменные: {sizeType} - тип размера, {fileId} - идентификатор изображения.
   */
  privateImageResizedUrlFormat: string;

  /**
   * Медиа запросы для изображений.
   */
  globalMediaRequests?: IImageMediaRequest[];
}

/**
 * Опции для работы с файлами в редакторе разметки
 */
export interface CrocoHtmlEditorFileOptions {
  /**
   * Использовать приватные файлы
   */
  usePrivateFiles: boolean;

  /**
   * Свойство которое подставляется в фильтр с файлами
   */
  applicationId: string | null;
}
