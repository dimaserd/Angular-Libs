import { Pipe, PipeTransform } from "@angular/core";
import { RichTextData } from "../extensions/TextMethods";

@Pipe({
    name: 'richTextToHtml',
    standalone: true
})
export class RichTextToHtmlPipe implements PipeTransform {

    transform(value: RichTextData): string {
        let result = "";

        for (let i = 0; i < value.data.children.length; i++) {
            const child = value.data.children[i];

            if (child.type === "text-block") {
                result += `<span>${child.data.text}</span>`;
            }
            else if (child.type === "line-break") {
                result += "</br>";
            }
        }

        return result;
    }
}
