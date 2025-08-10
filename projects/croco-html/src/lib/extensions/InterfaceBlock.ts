import { BaseApiResponse } from "../models";

export interface InterfaceBlock {
  /**
   * Название тега
   */
  type: string;
  data: any;
  validationResult?: BaseApiResponse | undefined;
  bootstrapHtml?: string | undefined
}
