import { TableData, TableMethods, TableTypes } from "../extensions";
import { InterfaceBlock } from "../models/InterfaceBlock";
import { HtmlBodyTag } from "../models";
import { CrocoHtmlOptions } from "../options";
import { IMarkUpTagService, IVisualEditorProps } from "./IMarkUpTagService";

export class TableTagService implements IMarkUpTagService {
  tagName: string = TableTypes.Table;
  shortDescription: string = "Таблица";

  bodyTagToHtmlStringConverter(bodyTag: HtmlBodyTag): string {
    return `<${this.tagName}>${bodyTag.innerHtml}</${this.tagName}>`
  }

  extractBlockFromHtmlElement(elem: HTMLElement, options: CrocoHtmlOptions): InterfaceBlock {
    return TableMethods.getTableFromHtmlTag(elem as HTMLTableElement, options);
  }

  toBodyTag(data: InterfaceBlock): HtmlBodyTag {

    let tableData = data.data as TableData;

    return {
      tagDescription: {
        tag: data.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: tableData,
      innerHtml: null
    };
  }

  getDefaultValue(props: IVisualEditorProps): HtmlBodyTag {
    return {
      tagDescription: {
        tag: this.tagName,
        displayValue: this.shortDescription,
        isCustom: false
      },
      attributes: {
      },
      innerHtml: props.htmlRaw,
    };
  }
}
