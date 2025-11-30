export interface StudentSimpleModel {
    id: string;
    surname: string;
    name: string;
    patronymic: string;
    email: string;
    noEmail: boolean;
    phoneNumber: string;
    noPhoneNumber: boolean;
    telegramUserName: string;
    telegramUserId: number | null;
    avatarFileId: number | null;
    isDeleting: boolean;
}

export interface SearchStudentsRequest {
    q: string;
    isDemo: boolean | null;
    schoolId: string;
    count: number | null;
    offSet: number;
}

export interface RegisterStudentRequest {
    registrationRequest: RegisterModel;
    schoolId: string;
    invitationId: string;
    setRandomPassword: boolean;
}

export interface StudentRegistrationResult {
    succeeded: boolean;
    message: string;
    studentId: string;
    alreadyExistingUserId: string;
    registeredUser: RegisteredUser;
}

export interface RegisteredUser {
    id: string;
    noPhoneNumber: boolean;
    phoneNumber: string;
    noEmail: boolean;
    email: string;
}

export interface RegisterModel {
    email: string;
    noEmail: boolean;
    name: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    noPhoneNumber: boolean;
    password: string;
}