import { BaseApiResponse } from '../models';
import { CrocoHtmlOptions } from '../options';
import { AngularMaterialTableMethods } from './AngularMaterialTableMethods';
import { BootstrapTableMethods } from './BootstrapTableMethods';
import { HtmlExtractionMethods } from './HtmlExtractionMethods';
import { InterfaceBlock } from "../models/InterfaceBlock";
import { TextSimpleMethods } from './TextSimpleMethods';

export interface TableHeaderData {
    type: "table-header";
    columns: string[];
}

export interface TableRowColumnData {
    type: "table-row-column-data";
    data: {
        text: string;
        children: InterfaceBlock[];
    }
}

export interface TableRowData {
    type: "table-row-column";
    columns: TableRowColumnData[];
}

export interface TableData {
    header: TableHeaderData;
    rows: TableRowData[];
    bootstrapHtml: string;
    html: string;
    angularMaterialTableDataCheck?: BaseApiResponse;
}

export interface TableTagData {
    type: "table";
    data: TableData;
}

export class TableTypes {
    static readonly TableRowColumnData = "table-row-column-data";
    static readonly Table = "table";
    static readonly TableRowColumn = "table-row-column";
}

export interface AngularMaterialTableData {
    displayedColumns: string[];
    data: object[];
}

export class TableMethods {

    static getTableFromHtmlTag(tableTag: HTMLTableElement, options: CrocoHtmlOptions): InterfaceBlock {

        const tableHeader = TableMethods.getHeader(tableTag);
        const tableRows = TableMethods.getTableRows(tableTag, options);

        let tableData: TableData = {
            header: tableHeader,
            rows: tableRows,
            bootstrapHtml: BootstrapTableMethods.BuildTable(tableHeader, tableRows),
            html: tableTag.outerHTML,
            angularMaterialTableDataCheck: AngularMaterialTableMethods.checkAngularMaterialTableData(tableHeader, tableRows)
        };

        return {
            tagName: TableTypes.Table,
            data: tableData,
            validationResult: this.checkTable(tableData)
        };
    }

    static checkTable(tableData: TableData): BaseApiResponse {

        let rows = tableData.rows;

        let prevRowCount = -1;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if (row.columns.length !== prevRowCount && prevRowCount != -1) {
                return {
                    isSucceeded: false,
                    message: `Ошибка при обработке разметки таблицы. `
                        + `Количество колонок в каждой строке таблицы должно соотвествовать друг другу. `
                        + `В строке таблицы №${i + 1} количество колонок = ${row.columns.length}, а в строке выше ${prevRowCount}.`
                };
            }
            prevRowCount = row.columns.length;
        }

        return {
            isSucceeded: true,
            message: "Ok"
        }
    }


    static getHeader(tableTag: HTMLTableElement): TableHeaderData {
        let header = tableTag.tHead;

        if (header === null) {
            return null;
        }

        let tr = header.children.item(0);

        let headerColumns: string[] = [];

        for (let j = 0; j < tr.children.length; j++) {
            const jElement = tr.children.item(j) as HTMLElement;

            headerColumns.push(jElement.innerHTML);
        }

        return {
            type: "table-header",
            columns: headerColumns
        };
    }

    static getTableRows(tableTag: HTMLTableElement, options: CrocoHtmlOptions): Array<TableRowData> {
        let tBody = tableTag.tBodies.item(0);

        let rows: TableRowData[] = [];

        for (let i = 0; i < tBody.children.length; i++) {
            const iElement = tBody.children.item(i);

            let rowColumns: TableRowColumnData[] = [];

            for (let j = 0; j < iElement.children.length; j++) {
                const jElement = iElement.children.item(j) as HTMLElement;

                let children = HtmlExtractionMethods.transformHtmlElementToBlocks(jElement, options);

                if (children.length === 0) {
                    var textTag = document.createElement("text");
                    textTag.innerHTML = jElement.innerHTML;

                    var textElem = TextSimpleMethods.ExtractTextTag(textTag);

                    children.push(textElem);
                }

                var result: TableRowColumnData = {
                    type: TableTypes.TableRowColumnData,
                    data: {
                        text: jElement.innerHTML,
                        children
                    }
                };

                rowColumns.push(result);
            }

            rows.push({
                type: TableTypes.TableRowColumn,
                columns: rowColumns
            });
        }

        return rows;
    }
}
