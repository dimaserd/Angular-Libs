export class HtmlRawTagDataConsts {
  static readonly TagName = "html-raw";
}

export interface ExtractHtmlRawTag {
  type: string;
  data: ExtractHtmlRawTagData;
}

export interface ExtractHtmlRawTagData {
  innerHTML: string;
}
