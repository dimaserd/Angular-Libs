export interface LoginViaLinkRequest {
    loginId: string;
    password: string;
}

export interface LoginViaLinkResult {
    isSucceeded: boolean;
    useRedirectLink: boolean;
    redirectLink: string;
    errorMessage: string;
    errorType: LoginViaLinkError;
    executionError: LinkActivationError | null;
}

export enum LoginViaLinkError {
    ModelNotValid = 'ModelNotValid',
    ActionExecution = 'ActionExecution',
    NoLoginData = 'NoLoginData',
    AuthenticationError = 'AuthenticationError'
}

export enum LinkActivationError {
    ModelValidation = 'ModelValidation',
    LinkNotFound = 'LinkNotFound',
    AlreadyExecuted = 'AlreadyExecuted',
    DateExpired = 'DateExpired',
    WrongPassword = 'WrongPassword',
    DatabaseError = 'DatabaseError'
}

export interface CurrentLoginData {
    isAuthenticated: boolean; 
    userId: string;
    email: string;
    roles: Array<string>;
    avatarFileId: number | null; 
    name: string; 
    surname: string; 
    patronymic: string; 
    noEmail: boolean; 
    phoneNumber: string; 
    noPhoneNumber: boolean; 
    applicationId: string; 
}

export interface LoginModel {
    email: string;
    /* Пароль */
    password: string;
    /* Запомнить меня */
    rememberMe: boolean;
}

export interface LoginByEmailOrPhoneNumber {
    emailOrPhoneNumber: string;
    /* Пароль */
    password: string;
    /* Запомнить меня */
    rememberMe: boolean;
}

export interface LoginResultModel {
    errorType: LoginErrorType | null;
    errorMessage: string;
    succeeded: boolean;
}

export enum LoginErrorType {
    Error = 'Error',
    ModelNotValid = 'ModelNotValid',
    AlreadyAuthenticated = 'AlreadyAuthenticated',
    UnSuccessfulAttempt = 'UnSuccessfulAttempt',
    EmailNotConfirmed = 'EmailNotConfirmed',
    UserDeactivated = 'UserDeactivated'
}

