import { BaseApiResponse } from "./models";

export interface BaseApiResponseWithFilesIds extends BaseApiResponse {
    responseObject: number[];
}