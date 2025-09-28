export interface SubjectModel {
  id: string;
  name: string;
  alias: string;
}

export interface CreateSubjectRequest {
  name: string;
  alias: string;
  clarificationValues: Array<string>;
}

export interface UpdateSubjectRequest {
  id: string;
  name: string;
  alias: string;
  clarificationValues: Array<string>;
}

export interface SubjectCountsModel {
  id: string;
  name: string;
  alias: string;
  questionsCount: number;
  testsCount: number;
}

export interface OrderSubjectsRequest {
  ids: Array<string>;
}

export interface SubjectWithClarificationsModel {
  id: string;
  name: string;
  alias: string;
  clarificationValues: Array<string>;
}

export interface SubjectWithIconModel {
  id: string;
  name: string;
  alias: string;
  icon: IconSimpleModel;
}

export interface IconSimpleModel {
  id: string;
  setId: string;
  name: string;
  fileId: number;
}

export interface SubjectMenuWithIconsModel {
  id: string;
  isMain: boolean;
  iconSetId: string;
  subjects: Array<SubjectWithIconModel>;
}

export interface CreateSubjectMenuRequest {
  isMain: boolean;
  name: string;
  iconSetId: string;
}

export interface SubjectMenuSimpleModel {
  id: string;
  name: string;
  isMain: boolean;
  iconSetId: string;
}