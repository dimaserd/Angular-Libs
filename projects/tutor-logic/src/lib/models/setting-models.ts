export interface SettingModel {
  name: string;
  description: string;
  data: string;
}

export interface TutorFullApplicationPublicOptions {
  applicationName: string;
  applicationUrl: string;
  customMainHostUrl: string;
  multiSchoolEnabled: boolean;
  telegramBotSettings: MainTelegramBotSettings;
  studentDemo: StudentDemoSettings;
  publicImageUrlFormat: string;
  privateImageUrlFormat: string;
  imagesPack: TutorImagesPackSettings;
  icon: IconApplicationSettings;
  webAppRoutes: WebAppRoutes;
  telephoneInputOptions: TelephoneInputOptions;
  solutionChatSettings: TestSolutionChatSettings;
  serverAppVersion: string;
  dataOnUtc: string;
}

export interface IconApplicationSettings {
  currentIconSetId: string;
}

export interface TestSolutionChatSettings {
  useNewChats: boolean;
}

export interface StudentDemoSettings {
  demoRegistrationEnabled: boolean;
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
  solutionCard: string;
}


export interface IconApplicatonSettings {
  currentIconSetId: string;
}


export interface WebAppRoutes {
  toGroupFormat: string;
  loginLinkFormat: string;
  schedules: string;
  materials: string;
  courseShop: string;
}


export interface TelephoneInputOptions {
  useInput: boolean;
}