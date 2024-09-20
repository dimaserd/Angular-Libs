import { Subject } from "rxjs";

/**
 * Сервис для обработки логики разметки
 */
export class HtmlViewController {

    onScriptCalled(script: string) {
        this.scriptCalled.next(script);
    }

    scriptCalled = new Subject<string>();
}