export interface CreateTest {
    name: string; 
    description: string; 
}

export interface EditTest {
    id: string; 
    name: string; 
    subjectId: string; 
    description: string; 
    isActive: boolean;
    isGlobal: boolean; 
}

export interface TestSearchModel {
  q: string; 
  subjectIds: Array<string>; 
  isActive: boolean | null; 
  isGlobal: boolean | null; 
  count: number | null; 
  offSet: number; 
}