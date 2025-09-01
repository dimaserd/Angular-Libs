/**
 * Сервис для прокидывания предрасчитанных данных для виджетов Html разметки.
 * Используется для оптимизации Http запросов за данными.
 */

export class HtmlPageDataController {

    data: object | null = null;

    /**
     * Получить данные.
     * @returns
     */
    get<T>(): T | null {

        if (!this.data) {
            return null;
        }

        return this.data as T;
    }

    /**
     * Установить данные.
     * @param data
     */
    set(data: object) {
        this.data = data;
    }
}
