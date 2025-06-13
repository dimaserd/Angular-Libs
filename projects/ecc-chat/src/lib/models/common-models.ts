/**
 * Список
 */
export interface GetListResult<T> {
    /*
    Сколько всего записей
     */
    totalCount: number;

    /*
    Текущий список
     */
    list: Array<T>;
}