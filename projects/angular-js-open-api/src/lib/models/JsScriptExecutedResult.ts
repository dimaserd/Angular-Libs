import { ExcepionData } from "./ExcepionData";
import { JsExecutionLog } from "./JsExecutionLog";
import { JsLogggedVariables } from "./JsLogggedVariables";

export interface JsScriptExecutedResult {
    id: string; 
    script: string; 
    isSucceeded: boolean; 
    errorMessage: string; 
    startedOnUtc: string | null; 
    finishedOnUtc: string | null; 
    consoleLogs: Array<JsLogggedVariables>; 
    executionLogs: Array<JsExecutionLog>; 
    exceptionData: ExcepionData; 
}