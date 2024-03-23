import { CrocoTypeDescriptionResult } from "./CrocoTypeDescriptionResult";

export interface OpenApiMethodDocumentation {
    methodName: string;
    description: string;
    resultDescription: string;
    parameterDescriptions: Array<string>;
    response: CrocoTypeDescriptionResult;
    parameters: Array<CrocoTypeDescriptionResult>;
}
