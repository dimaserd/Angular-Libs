import { ExternalJsComponent } from "./ExternalJsComponent";
import { JsOpenApiServiceDocumentation } from "./JsOpenApiServiceDocumentation";

export interface JsOpenApiDocs {
    services: Array<JsOpenApiServiceDocumentation>; 
    externalJsComponents: Array<ExternalJsComponent>; 
}