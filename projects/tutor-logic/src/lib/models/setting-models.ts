import { SubjectMenuWithIconsModel } from "./subject.models";

export interface TutorFullApplicationPublicOptions {
  applicationName: string;
  applicationUrl: string;
  customMainHostUrl: string;
  multiSchoolOptions: MultiSchoolOptions;
  telegramBotSettings: MainTelegramBotSettings;
  studentDemo: StudentDemoSettings;
  mainMenu: SubjectMenuWithIconsModel;
  publicImageUrlFormat: string;
  privateImageUrlFormat: string;
  fileIdAndNamePathUrlFormat: string;
  imagesPack: TutorImagesPackSettings;
  icon: IconApplicationSettings;
  webAppRoutes: WebAppRoutes;
  telephoneInputOptions: TelephoneInputOptions;
  userAgreements: UserAgreementsOptions;
  serverAppVersion: string;
  dataOnUtc: string;
}

export interface UserAgreementsOptions {
  useRegistrationCheckBox: boolean;
  registrationCheckBoxHtml: string;
  userAgreementUrl: string;
  personalDataProcessingPolicyUrl: string;
}


export interface MultiSchoolOptions {
  schoolRegistrationEnabled: boolean;
  infoEmail: string;
}

export interface IconApplicationSettings {
  currentIconSetId: string;
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