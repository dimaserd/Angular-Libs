import { InterfaceBlock } from "./InterfaceBlock";
import { FileImageTagDataConsts } from './ImageMethods';
import { TableData, TableHeaderData, TableRowData } from './TableMethods';
import { SimpleTextTag, TextTag } from './TextSimpleMethods';
import { FileImageTag } from "../models/image-models";

export class BootstrapTableMethods {

    static BuildTable(data: TableData): string {
        let result = `<table class="table table-bordered">`;
        result += this.BuildHeader(data.header);
        result += this.BuildBody(data.rows);
        result += "</table>";

        return result;
    }

    static BuildHeader(data: TableHeaderData) {
        if (data === null) {
            return "";
        }

        let result = "<thead>";
        result += "<tr>";
        for (let index = 0; index < data.columns.length; index++) {
            result += `<th>${data.columns[index]}</th>`;
        }
        result += "</tr>";

        result += "</thead>";

        return result;
    }

    static BuildBody(rows: TableRowData[]) {
        let result = "<tbody>";

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            result += "<tr>";
            for (let j = 0; j < row.columns.length; j++) {
                const col = row.columns[j];

                result += `<td class="align-middle">${this.BuildInnerTags(col.data.children)}</td>`;
            }
            result += "</tr>";
        }

        result += "</tbody>";
        return result;
    }

    static BuildInnerTags(tags: InterfaceBlock[]) {
        let result = "";
        for (let i = 0; i < tags.length; i++) {
            result += this.BuildInnerTag(tags[i]);
        }

        return result;
    }

    static BuildInnerTag(data: InterfaceBlock): string {
        if (data.type === FileImageTagDataConsts.TagName) {
            let fileImageTag = data as FileImageTag;
            return `<img src=${fileImageTag.data.src} class="mx-auto d-block img-fluid" />`;
        }
        else if(data.type === TextTag){

            let simpleTextTag = data as SimpleTextTag;

            var map = {
                ["left"]: "text-start",
                ["center"]: "text-center",
                ["right"]: "text-end"
            };

            if(!simpleTextTag.data.validationResult.isSucceeded){
                return `<span>Ошибка в тексте ${simpleTextTag.data.validationResult.message}</span>`;
            }

            return `<div class="${map[simpleTextTag.data.horizontalAlignment]}"><span>${simpleTextTag.data.html}</span></div>`;
        }
        else {
            return `<p>Тег ${data.type} не поддерживается</p>`;
        }
    }
}
