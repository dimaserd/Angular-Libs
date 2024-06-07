import { LoginResultModel } from "./login-models";

export interface ForgotPasswordModel {
    email: string;
}

export interface ChangePasswordByTokenRequest {
    requestId: string;
    newPassword: string;
}

export interface EditClient {
    name: string;
    birthDate: string | null;
    surname: string;
    patronymic: string;
    sex: boolean | null;
    phoneNumber: string;
}

export interface RegisterModel {
    email: string;
    name: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    password: string;
    noEmail: boolean,
    noPhoneNumber: boolean
}

export interface RegisterAndSignInResult {
    registrationResult: RegistrationResult;
    loginResult: LoginResultModel;
}

export interface RegistrationResult {
    succeeded: boolean;
    errorMessage: string;
    errorType: RegistrationErrorResultType | null;
    registeredUser: RegisteredUser;
}

export enum RegistrationErrorResultType {
    RegistrationNotEnabled = 'RegistrationNotEnabled',
    AlreadyAuthenticated = 'AlreadyAuthenticated',
    EmailShouldBeSet = 'EmailShouldBeSet',
    PhoneNumberShouldBeSet = 'PhoneNumberShouldBeSet',
    UserWithThisEmailAlreadyExists = 'UserWithThisEmailAlreadyExists',
    UserWithThisPhoneAlreadyExists = 'UserWithThisPhoneAlreadyExists',
    UserManagerError = 'UserManagerError',
    ClientAddingError = 'ClientAddingError',
    UnAcceptablePassword = 'UnAcceptablePassword'
}

export interface RegisteredUser {
    id: string;
    phoneNumber: string;
    email: string;
}

export interface UserWithNameAndEmailAvatarModel {
    id: string;
    email: string;
    name: string;
    avatarFileId: number | null;
}

export interface UserSearch {
    q: string;
    deactivated: boolean | null;
    registrationDate: DateTimeRange;
    searchSex: boolean;
    sex: boolean | null;
    count: number | null;
    offSet: number;
}

export interface DateTimeRange {
    min: string | null;
    max: string | null;
}

export interface RegisterModel {
    email: string;
    name: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    password: string;
}

export interface ClientModel {
    id: string;
    name: string;
    birthDate: string | null;
    registrationDate: string;
    surname: string;
    patronymic: string;
    sex: boolean | null;
    phoneNumber: string;
    email: string;
    avatarFileId: number | null;
}

export interface EditApplicationUser {
    id: string;
    name: string;
    email: string;
    birthDate: string | null;
    surname: string;
    patronymic: string;
    sex: boolean | null;
    objectJson: string;
    phoneNumber: string;
}

/**
 * Модель для изменения пароля
 */
export interface ChangeUserPasswordModel {
    /**
     * Старый пароль
     */
    oldPassword: string;

    /**
     * Новый пароль
     */
    newPassword: string;
}