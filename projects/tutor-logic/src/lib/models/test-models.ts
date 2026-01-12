export interface CreateTestRequest {
  name: string;
  subjectId: string;
  sourceType: string;
  description: string;
  isActive: boolean;
  questionIds: Array<string>;
}

export interface EditTestRequest {
  id: string;
  name: string;
  subjectId: string;
  description: string;
  isActive: boolean;
}

export interface SearchTestsRequest {
  q: string;
  subjectIds: Array<string>;
  isActive: boolean | null;
  useSourceType: boolean;
  sourceType: string;
  schoolId: string;
  count: number | null;
  offSet: number;
}