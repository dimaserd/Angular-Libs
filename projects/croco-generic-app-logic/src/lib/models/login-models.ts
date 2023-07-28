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
    ModelNotValid = <any>'ModelNotValid',
    ActionExecution = <any>'ActionExecution',
    NoLoginData = <any>'NoLoginData',
    AuthenticationError = <any>'AuthenticationError'
}

export enum LinkActivationError {
    ModelValidation = <any>'ModelValidation',
    LinkNotFound = <any>'LinkNotFound',
    AlreadyExecuted = <any>'AlreadyExecuted',
    DateExpired = <any>'DateExpired',
    WrongPassword = <any>'WrongPassword',
    DatabaseError = <any>'DatabaseError'
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
    noPhoneNumber: boolean;
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
    Error = <any>'Error',
    ModelNotValid = <any>'ModelNotValid',
    AlreadyAuthenticated = <any>'AlreadyAuthenticated',
    UnSuccessfulAttempt = <any>'UnSuccessfulAttempt',
    EmailNotConfirmed = <any>'EmailNotConfirmed',
    UserDeactivated = <any>'UserDeactivated'
}

