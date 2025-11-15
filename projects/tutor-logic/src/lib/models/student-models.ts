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
}

export interface StudentRegistrationResult {
    succeeded: boolean;
    message: string;
    studentId: string;
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