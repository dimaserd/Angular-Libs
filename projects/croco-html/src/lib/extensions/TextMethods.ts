export interface TextBlock{
    type: "text-block" | "text-sup-block" | "text-sub-block";
    data: {
      text: string;
    }
  }
  
  export interface LineBreakBlock {
    type: "line-break";
  }
  
  export interface RichTextData{
    type: "rich-text"
    data: {
      children: Array<TextBlock | LineBreakBlock>;
    }
  }

export class TextTags {

  public static readonly text = "text";

  public static readonly h1 = "h1";

  public static readonly h2 = "h2";

  public static readonly h3 = "h3";

  public static readonly h4 = "h4";

  public static readonly h5 = "h5";

  public static readonly h6 = "h6";

  public static allTextTags = [TextTags.text, TextTags.h1, TextTags.h2, TextTags.h3, TextTags.h4, TextTags.h5, TextTags.h6];

}

export class TextMethods {

  static ExtractRichTextData(elem: HTMLElement): RichTextData {

    let children: Array<TextBlock | LineBreakBlock> = [];
    for (let i = 0; i < elem.children.length; i++) {
      const child = elem.children.item(i);

      if (child.tagName === "text-block".toUpperCase()) {
        children.push({
          type: "text-block",
          data: {
            text: child.innerHTML
          }
        });
      }
      else if (child.tagName === "line-break".toUpperCase()) {
        children.push({
          type: "line-break"
        });
      }
    }

    return {
      type: "rich-text",
      data: {
        children
      }
    };
  }
}
