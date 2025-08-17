import { Type } from "@angular/core";
import { IImageMediaRequest } from "../models";
import { VisualEditorComponent } from "../components";

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
  definedCustomTags: string[];

  /**
   * Обработчик нажатия на кнопку кастомных виджетов
   * @returns 
   */
  customWidgetClickHandler: (editor: VisualEditorComponent) => void;
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
