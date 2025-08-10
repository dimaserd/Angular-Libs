import { BaseApiResponse } from "../models";

export interface InterfaceBlock {
  /**
   * Название тега
   */
  type: string;
  data: object;
  validationResult?: BaseApiResponse | undefined;
  bootstrapHtml?: string | undefined
}
