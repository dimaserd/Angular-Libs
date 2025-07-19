import { SubjectWithIconModel } from "./subject.models";

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

export interface CreateSubjectMenuRequest {
	 isMain: boolean; 
	 name: string; 
	 iconSetId: string; 
}

export interface SubjectMenuWithIconsModel {
  id: string;
  isMain: boolean;
  iconSetId: string;
  subjects: Array<SubjectWithIconModel>;
}

export interface SubjectMenuSimpleModel {
  id: string;
  name: string;
  isMain: boolean;
  iconSetId: string;
}