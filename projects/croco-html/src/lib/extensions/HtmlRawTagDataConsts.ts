export class HtmlRawTagDataConsts {
    static TagName = "html-raw";
}

export interface ExtractHtmlRawTag{
  type: string;
  data: ExtractHtmlRawTagData;
}

export interface ExtractHtmlRawTagData{
  innerHTML: string;
}

export class ExtractHtmlRawTagMethods {
  static ExtractHtmlRawTag(elem: HTMLElement): ExtractHtmlRawTag {
    return {
      type: HtmlRawTagDataConsts.TagName,
      data: {
        innerHTML: elem.innerHTML
      }
    }
  }
}
