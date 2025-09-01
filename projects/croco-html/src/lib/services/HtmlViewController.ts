import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * Сервис для обработки логики разметки
 */
@Injectable({
    providedIn: 'root'
})
export class HtmlViewController {

    onScriptCalled(script: string) {
        this.scriptCalled.next(script);
    }

    scriptCalled = new Subject<string>();
}

