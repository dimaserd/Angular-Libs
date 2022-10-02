import { Pipe, PipeTransform } from '@angular/core';
import { BodyTagsExtensions } from '../extensions/BodyTagsExtensions';
import { HtmlBodyTag } from '../models/models';

@Pipe({
    name: 'tohtmlbodytags'
})
export class ToHtmlBodyTagsPipe implements PipeTransform {
    
    transform(value: string): HtmlBodyTag[] {
        return BodyTagsExtensions.getBodyTags(value);
    }
    
}
