import { IconSimpleModel } from "./icon-models";
import { SubjectMenu } from "./subject-menu-models";

export interface SubjectModel {
  id: string;
  name: string;
  alias: string;
}

export interface CreateSubject {
  name: string;
  alias: string;
}

export interface UpdateSubjectRequest {
  id: string;
  name: string;
  alias: string;
}

export interface SubjectCountsModel {
  id: string;
  name: string;
  alias: string;
  questionsCount: number;
  testsCount: number;
}

export interface ChangeSubjectConfiguration {
  id: string;
  configuration: SubjectMenu;
}

export interface OrderSubjectsRequest {
  ids: Array<string>;
}

export interface SubjectWithIconModel {
  id: string;
  name: string;
  alias: string;
  icon: IconSimpleModel;
}

export interface SubjectForStudentDetailedViewModel {
  icon: IconSimpleModel;
  subject: SubjectModel;
  menu: SubjectMenu;
  globalTests: Array<SubjectTestSimpleModel>;
}

export interface SubjectTestSimpleModel {
  id: string;
  name: string;
}

export interface SubjectWithClarificationsModel {
  id: string;
  name: string;
  alias: string;
  clarificationValues: Array<string>;
}
