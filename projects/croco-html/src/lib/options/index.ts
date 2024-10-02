import { IMediaRequest } from "../extensions";

export interface CrocoHtmlOptions {
    publicImageResizedUrlFormat: string;
    globalMediaRequests?: IMediaRequest[];
}