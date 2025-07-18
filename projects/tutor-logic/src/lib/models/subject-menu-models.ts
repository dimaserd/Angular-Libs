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

export interface SubjectMenuWithIconsModel {
  id: string;
  isMain: boolean;
  iconSetId: string;
  subjects: Array<SubjectWithIconModel>;
}

export interface SubjectWithIconModel {
  id: string;
  name: string;
  alias: string;
  icon: IconSimpleModel;
}