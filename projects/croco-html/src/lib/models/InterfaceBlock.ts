import { BaseApiResponse } from ".";

export interface InterfaceBlock {
  /**
   * Название тега
   */
  tagName: string;
  data: any;
  validationResult?: BaseApiResponse | undefined;
}
