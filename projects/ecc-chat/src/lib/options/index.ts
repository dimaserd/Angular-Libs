import { InjectionToken } from '@angular/core';

export interface EccChatOptions {
  fileIdAndSizeImageFormat: string;
}

export const EccChatOptionsToken = new InjectionToken<EccChatOptions>('ecc-chat-options');
