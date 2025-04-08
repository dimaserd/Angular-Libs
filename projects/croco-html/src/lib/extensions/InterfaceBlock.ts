import { BaseApiResponse } from "../services/PublicFileUploadService";

export interface InterfaceBlock {
  type: string;
  data: any;
  validationResult?: BaseApiResponse | undefined;
  bootstrapHtml?: string | undefined
}
