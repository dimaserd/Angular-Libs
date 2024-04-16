import { JsSerializedVariable } from "./JsSerializedVariable";

export interface JsLogggedVariables {
    loggedOnUtc: string;
    serializedVariables: Array<JsSerializedVariable>;
}