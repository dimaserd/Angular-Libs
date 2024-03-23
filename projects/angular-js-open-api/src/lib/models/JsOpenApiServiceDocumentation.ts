import { OpenApiMethodDocumentation } from "./OpenApiMethodDocumentation";

export interface JsOpenApiServiceDocumentation {
    name: string;
    description: string;
    methods: Array<OpenApiMethodDocumentation>;
}
