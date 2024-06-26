import { ExcepionData } from "./ExcepionData";
import { JsOpenApiDocs } from "./JsOpenApiDocs";
import { RemoteJsOpenApi } from "./RemoteJsOpenApi";

export interface RemoteJsOpenApiDocs {
    description: RemoteJsOpenApi;
    docs: JsOpenApiDocs;
    docsReceivedOnUtc: string;
    isDocsReceived: boolean;
    receivingException: ExcepionData;
}