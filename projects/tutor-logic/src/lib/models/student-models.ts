
export interface StudentSimpleModel {
    id: string; 
    surname: string; 
    name: string; 
    email: string; 
    phoneNumber: string; 
    telegramUserName: string; 
    telegramUserId: number | null; 
    isDeleting: boolean; 
}

export interface StudentModel {
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