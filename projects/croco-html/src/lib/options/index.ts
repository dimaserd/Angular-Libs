import { Type } from "@angular/core";
import { IMediaRequest } from "../models";
import { VisualEditorComponent } from "../components";

export interface CrocoHtmlOptions {

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

  globalMediaRequests?: IMediaRequest[];

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
   * Обработчик нажатия на кнопку кастомных виджетов
   * @returns 
   */
  customWidgetClickHandler: (editor: VisualEditorComponent) => void;
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
