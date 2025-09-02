import { da, tr } from "date-fns/locale";
import { BaseApiResponse } from "../models";
import { TextAlignment } from "../tag-services";

export const TextTag = "text";

export interface GenericTextTag {
    tagName: string,
    data: SimpleTextTagData
}

export interface IHorizontalAlignmentExtractionResult {
    succeeded: boolean;
    result: TextAlignment;
    errorMessage: string;
}

export interface SimpleTextTagData {
    textTagName: string;
    text: string,
    html: string,
    horizontalAlignment: "left" | "right" | "center",
    validationResult: BaseApiResponse
}

export class TextSimpleMethods {

    static supportedTags = ["sup", "sub", "strong", "b", "i", "u"];

    static extractTextTag(elem: HTMLElement): GenericTextTag {

        const hAlignExtractResult = this.extractHorizontalAlignment(elem);

        var data: SimpleTextTagData = {
            textTagName: elem.tagName.toLowerCase(),
            text: this.prepareText(elem.innerText),
            html: this.prepareText(elem.innerHTML),
            horizontalAlignment: hAlignExtractResult.result,
            validationResult: {
                isSucceeded: true,
                message: "Ok"
            }
        };

        if (!hAlignExtractResult.succeeded) {
            data.validationResult.isSucceeded = false;
            data.validationResult.message = hAlignExtractResult.errorMessage;
        }

        let result: GenericTextTag = {
            tagName: data.textTagName,
            data: data
        };

        var html = result.data.html;
        var htmlValidation = this.validateTextHtml(html);

        if (!htmlValidation.isSucceeded) {
            result.data.validationResult = htmlValidation;
        }

        return result;
    }

    static prepareText(s: string): string {
        s = s.trim().replace('\n\t', '');

        if (s === '\n') {
            s = '';
        }

        return s;
    }

    static extractHorizontalAlignment(elem: HTMLElement): IHorizontalAlignmentExtractionResult {
        const hAlignValue = elem.getAttribute("h-align") ?? TextAlignment.Left;

        const alignmentVals: string[] = [TextAlignment.Left, TextAlignment.Right, TextAlignment.Center];

        if (alignmentVals.indexOf(hAlignValue) < 0) {

            return {
                result: TextAlignment.Left,
                succeeded: false,
                errorMessage: `Недопустимое значение атрибута h-align. Допустимые значения: ${alignmentVals.join(', ')}. `
                    + 'Данный тег можно не указывать, по-умолчанию будет применено выравнивание слева.'
            };
        }

        return {
            result: hAlignValue as TextAlignment,
            succeeded: true,
            errorMessage: ""
        };
    }

    static validateTextHtml(html: string): BaseApiResponse {

        var p = document.createElement("p");
        p.innerHTML = html;

        for (let i = 0; i < p.children.length; i++) {
            const element = p.children.item(i);

            var validationResult = this.validateTag(element);

            if (!validationResult.isSucceeded) {
                return validationResult;
            }
        }

        return {
            isSucceeded: true,
            message: `Ok`
        }
    }

    static validateTag(element: Element): BaseApiResponse {
        let lowerTag = element.tagName.toLowerCase();

        if (!this.supportedTags.includes(lowerTag)) {
            return {
                isSucceeded: false,
                message: `Тег <${lowerTag}> не поддерживается внутри тега <text>`
            }
        }

        for (let i = 0; i < element.children.length; i++) {
            const nElement = element.children.item(i);

            var innerValidationResult = this.validateTag(nElement);

            if (!innerValidationResult.isSucceeded) {
                return innerValidationResult;
            }
        }

        return {
            isSucceeded: true,
            message: "Ok"
        };
    }
}
