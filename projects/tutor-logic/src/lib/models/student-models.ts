export interface StudentSimpleModel {
    id: string; 
    email: string; 
    name: string; 
    surname: string; 
    patronymic: string; 
    phoneNumber: string; 
    isDeleting: boolean; 
    telegramUserId: number | null; 
    telegramUserName: string; 
}

export interface SearchStudents {
    q: string;
    count: number | null; 
    offSet: number; 
}

export interface RegisterStudentRequest {
    registrationRequest: RegisterModel; 
    schoolId: string; 
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