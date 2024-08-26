import { BaseApiResponse } from "../services/file-upload.service";

export interface InterfaceBlock {
  type: string;
  data: any;
  validationResult?: BaseApiResponse | undefined;
  bootstrapHtml?: string | undefined
}
