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

export class TextMethods {

  static textTags = ["text", "h1", "h2", "h3", "h4", "h5", "h6"];

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
