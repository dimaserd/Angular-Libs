import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'tagToSpan'
})
export class TagToSpanPipe implements PipeTransform {
    transform(value: string[]): string {
        return value.map(x => (`<b>${x}</b>`)).join(' | ')
    }
}