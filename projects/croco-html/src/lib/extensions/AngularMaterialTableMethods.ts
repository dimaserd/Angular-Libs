import { BaseApiResponse } from '../models';
import { AngularMaterialTableData, TableHeaderData, TableRowData } from './TableMethods';

export class AngularMaterialTableMethods {
    static getAngularMaterialTableData(columns: string[], rows: TableRowData[]): AngularMaterialTableData {

        let data: object[] = [];

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];

            var elem = {};

            for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                const column = columns[columnIndex];

                elem[column] = row.columns[columnIndex].data.text;
            }

            data.push(elem);
        }

        return {
            displayedColumns: columns,
            data: data,
        };
    }

    static checkHeaders(header: TableHeaderData): BaseApiResponse {
        if (header === null) {
            return {
                isSucceeded: false,
                message: "Необходимо указать заголовок таблицы"
            };
        }

        let columns: string[] = header.columns;

        var uniqueDislayedColumns = columns.filter((v, i, a) => a.indexOf(v) === i);

        if (uniqueDislayedColumns.length !== columns.length) {
            return {
                isSucceeded: false,
                message: "Ошибка при обработке разметки таблицы. Обнаружены дубликаты заголовков."
            };
        }

        return {
            isSucceeded: true,
            message: "Ok"
        };
    }
    static checkAngularMaterialTableData(header: TableHeaderData, rows: TableRowData[], checkHeaders: boolean = true): BaseApiResponse {

        if (checkHeaders) {
            var checkHeadersResult = this.checkHeaders(header);

            if (!checkHeadersResult.isSucceeded) {
                return checkHeadersResult;
            }
        }

        let columns: string[] = header.columns;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if (row.columns.length !== columns.length) {
                return {
                    isSucceeded: false,
                    message: `Ошибка при обработке разметки таблицы. `
                        + `Количество колонок в каждой строке таблицы должно соотвествовать количеству колонок указанных в заголовке. `
                        + `В строке таблицы №${i + 1} количество колонок = ${row.columns.length}, а должно быть ${columns.length}.`
                };
            }
        }

        return {
            isSucceeded: true,
            message: "Ok"
        };
    }
}
