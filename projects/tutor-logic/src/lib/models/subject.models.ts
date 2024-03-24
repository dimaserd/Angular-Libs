import { IconSimpleModel } from "./icon-models";

export interface SubjectMenu {
  root: SubjectMenuItem;
}

export interface SubjectMenuItem {
  text: string;
  path: string;
  type: SubjectMenuItemType;
  workSpaceId: string;
  children: Array<SubjectMenuItem>;
}

export enum SubjectMenuItemType {
  MenuItem = 'MenuItem',
  WorkSpaceLink = 'WorkSpaceLink',
  SubjectTestsLink = 'SubjectTestsLink',
}

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
