import { Inject, Pipe, PipeTransform } from '@angular/core';
import { BodyTagsExtensions } from '../extensions/BodyTagsExtensions';
import { HtmlBodyTag } from '../models/models';
import { CrocoHtmlOptions } from '../extensions/HtmlExtractionMethods';
import { CrocoHtmlOptionsToken } from '../consts';

@Pipe({
    name: 'tohtmlbodytags'
})
export class ToHtmlBodyTagsPipe implements PipeTransform {

    constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
    }

    transform(value: string): HtmlBodyTag[] {
        return BodyTagsExtensions.getBodyTags(value, this._options);
    }
}
