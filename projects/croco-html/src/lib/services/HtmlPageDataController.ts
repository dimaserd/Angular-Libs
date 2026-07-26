/**
 * Сервис для прокидывания предрасчитанных данных для виджетов Html разметки.
 * Используется для оптимизации Http запросов за данными.
 */
export class HtmlPageDataController {

    public readonly _data = new Map<string, object>();

    /**
     * Получить данные.
     * @returns
     */
    get<T>(name: string): T | null {

        if (!this._data.has(name)) {
            return null;
        }

        return this._data.get(name) as T;
    }

    /**
     * Установить данные.
     * @param data
     */
    set(name: string, data: object) {
        this._data.set(name, data);
    }
}
