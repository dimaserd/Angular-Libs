import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { TutorFullApplicationPublicOptions } from "../models";
import { of, tap } from "rxjs";

/**
 * Сервис для предоставления публичной конфигурации по приложению
 */
@Injectable({
    providedIn: 'root',
})
export class TutorAppConfigurationService {

    static readonly VariableKey = "__Tutor.FullConfiguration";

    private baseControllerUrl: string;

    constructor(
        private readonly _http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.baseControllerUrl = `${baseUrl}api/tutor/settings/application`;
    }

    /**
     * Получить конифгурацию из window
     * @returns
     */
    get(): TutorFullApplicationPublicOptions {
        return TutorAppConfigurationService.getFromWindow();
    }

    /**
     * Получить конифгурацию из window
     * @returns
     */
    static getFromWindow(): TutorFullApplicationPublicOptions {
        const value = window[TutorAppConfigurationService.VariableKey];

        if (value === undefined || value === null) {
            throw new Error(`в window не установлена переменная ${TutorAppConfigurationService.VariableKey}`);
        }

        return value;
    }

    set(value: TutorFullApplicationPublicOptions) {
        window[TutorAppConfigurationService.VariableKey] = value;
    }

    getFromServerIfValueNotSet() {

        const value = window[TutorAppConfigurationService.VariableKey];

        if (value === undefined || value === null) {
            return this._http.get<TutorFullApplicationPublicOptions>(this.baseControllerUrl).pipe(tap(value => {
                this.set(value);
                return value;
            }));
        }


        return of<TutorFullApplicationPublicOptions>(value);
    }
}
