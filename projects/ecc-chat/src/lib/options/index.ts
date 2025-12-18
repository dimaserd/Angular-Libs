import { InjectionToken } from '@angular/core';

export interface EccChatOptions {
  getFileDownloadUrl(fileId: number): string | null;
  getMediumImageFilePath(fileId: number): string | null;
  getOriginalImageFilePath(fileId: number): string | null;
  getSmallImageFilePath(fileId: number): string | null;
  getIconImageFilePath(fileId: number): string | null;
  getSizedImageFilePath(fileId: number, sizeName: string): string | null;
}

export const EccChatOptionsToken = new InjectionToken<EccChatOptions>('ecc-chat-options');
