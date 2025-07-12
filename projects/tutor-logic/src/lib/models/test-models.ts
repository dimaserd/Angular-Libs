export interface CreateTestRequest {
  name: string;
  isGlobal: boolean;
  subjectId: string;
  sourceType: string;
  description: string;
}

export interface EditTestRequest {
  id: string;
  name: string;
  subjectId: string;
  description: string;
  isActive: boolean;
  isGlobal: boolean;
}

export interface SearchTestsRequest {
  q: string;
  subjectIds: Array<string>;
  isActive: boolean | null;
  useSourceType: boolean;
  sourceType: string;
  isGlobal: boolean | null;
  count: number | null;
  offSet: number;
}