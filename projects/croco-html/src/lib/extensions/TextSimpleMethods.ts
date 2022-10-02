import { BaseApiResponse } from "./TableMethods";

export const TextTag = "text";

export interface SimpleTextTag {
    type: "text",
    data: SimpleTextTagData
}

export interface GenericTextTag {
    type: string,
    data: SimpleTextTagData
}

export interface SimpleTextTagData {
    textTagName: string;
    text: string,
    html: string,
    horizontalAlignment: "left" | "right" | "center",
    validationResult: BaseApiResponse
}

export class TextSimpleMethods {

    static supportedTags = ["sup", "sub", "strong", "b", "i"];

    static ExtractTextTag(elem: HTMLElement): SimpleTextTag {
        var hAlignValue = elem.getAttribute("h-align") ?? "left" as any;

        var data: SimpleTextTagData = {
            textTagName: elem.tagName.toLowerCase(),
            text: elem.innerText.trim().replace('\n\t', ''),
            html: elem.innerHTML.trim().replace('\n\t', ''),
            horizontalAlignment: hAlignValue,
            validationResult: {
                isSucceeded: true,
                message: "Ok"
            }
        };

        let result: SimpleTextTag = {
            type: TextTag,
            data: data
        };

        if(result.data.text === '\n'){
            result.data.text = '';
        }
        if(result.data.html === '\n'){
            result.data.html = '';
        }

        var alignmentVals = ["left", "right", "center"];

        if (alignmentVals.indexOf(hAlignValue) < 0) {

            result.data.validationResult = {
                isSucceeded: false,
                message: `Недопустимое значение атрибута h-align. Допустимые значения: ${alignmentVals.join(', ')}. `
                    + 'Данный тег можно не указывать, по-умолчанию будет применено выравнивание слева.'
            };
        }

        var html = result.data.html;
        var htmlValidation = this.ValidateTextHtml(html);

        if(!htmlValidation.isSucceeded){
            result.data.validationResult = htmlValidation;
        }

        return result;
    }

    static ValidateTextHtml(html: string) : BaseApiResponse{

        var p = document.createElement("p");
        p.innerHTML = html;

        for (let i = 0; i < p.children.length; i++) {
            const element = p.children.item(i);

            var validationResult = this.ValidateTag(element);

            if(!validationResult.isSucceeded){
                return validationResult;
            }
        }

        return {
            isSucceeded:true,
            message: `Ok`
        }
    }

    static ValidateTag(element : Element): BaseApiResponse{
        let lowerTag = element.tagName.toLowerCase();

        if(!this.supportedTags.includes(lowerTag)){
            return {
                isSucceeded: false,
                message: `Тег <${lowerTag}> не поддерживается внутри тега <text>`
            }
        }

        for (let i = 0; i < element.children.length; i++) {
            const nElement = element.children.item(i);

            var innerValidationResult = this.ValidateTag(nElement);

            if(!innerValidationResult.isSucceeded){
                return innerValidationResult;
            }
        }

        return {
            isSucceeded: true,
            message: "Ok"
        };
    }
}
