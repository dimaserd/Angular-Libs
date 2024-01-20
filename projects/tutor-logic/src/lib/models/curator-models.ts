export interface CreateOrUpdateCuratorMessageTemplate {
    questionId: string;
    name: string;
    text: string;
  }
  
  export interface CuratorMessageTemplateModel {
    name: string;
    text: string;
  }
  
  export interface SearchCuratorMessageTemplates {
    questionId: string;
    name: string;
    count: number | null;
    offSet: number;
  }
  
  export interface DeleteCuratorMessageTemplate {
    questionId: string;
    name: string;
  }