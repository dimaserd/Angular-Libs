import { BaseApiResponse } from "../models";

export interface InterfaceBlock {
  type: string;
  data: any;
  validationResult?: BaseApiResponse | undefined;
  bootstrapHtml?: string | undefined
}
