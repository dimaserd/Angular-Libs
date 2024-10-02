import { Inject, Pipe, PipeTransform } from '@angular/core';
import { BodyTagsExtensions } from '../extensions/BodyTagsExtensions';
import { HtmlBodyTag } from '../models/models';
import { CrocoHtmlOptionsToken } from '../consts';
import { CrocoHtmlOptions } from '../options';

@Pipe({
    name: 'tohtmlbodytags',
    standalone: true
})
export class ToHtmlBodyTagsPipe implements PipeTransform {

    constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
    }

    transform(value: string): HtmlBodyTag[] {
        return BodyTagsExtensions.getBodyTags(value, this._options);
    }
}
