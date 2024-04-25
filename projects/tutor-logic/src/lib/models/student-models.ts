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