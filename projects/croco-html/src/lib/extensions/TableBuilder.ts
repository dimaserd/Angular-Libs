import { XmlExtensions } from './XmlExtensions';

export class TableBuilder {
    static getTableMarkUp(rows: number, cols: number, generateHeaders: boolean): string {
        rows = +rows;
        cols = +cols;

        let result = "<table>";
        
        if(generateHeaders){
            result += TableBuilder.getTableHeaderMarkUp(cols);
        }
        
        result += TableBuilder.getTableBodyMarkUp(cols, rows);
        result += "</table>";

        return XmlExtensions.formatXml(result);
    }

    static getTableHeaderMarkUp(cols: number): string {

        let result = "<thead><tr>";

        for (let i = 0; i < cols; i++) {
            result += `<th>Колонка #${i + 1}</th>`;
        }

        result += "</tr></thead>";

        return result;
    }

    static getTableBodyMarkUp(cols: number, rows: number): string {

        let result = "<tbody>";

        for (let row = 0; row < rows; row++) {
            result += "<tr>";
            for (let i = 0; i < cols; i++) {

                result += `<td>Ряд№${row + 1} Колонка #${i + 1}</td>`;
            }
            result += "</tr>";
        }

        result += "</tbody>";

        return result;
    }
}
