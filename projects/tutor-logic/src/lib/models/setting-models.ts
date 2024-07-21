export interface SettingModel {
  name: string;
  description: string;
  data: string;
}

export interface TutorFullApplicationPublicOptions {
  applicationName: string;
  applicationUrl: string;
  telegramBotSettings: MainTelegramBotSettings;
  publicImageUrlFormat: string;
  imagesPack: TutorImagesPackSettings;
}

export interface MainTelegramBotSettings {
  hasBot: boolean;
  botName: string;
  toBotWebButtonText: string;
}

export interface TutorImagesPackSettings {
  error: string;
  success: string;
  solutionFinished: string;
}