import { Pipe, PipeTransform } from '@angular/core';
import { HtmlExtractionMethods, HtmlExtractionOptions } from '../extensions/HtmlExtractionMethods';
import { InterfaceBlock } from "../extensions/InterfaceBlock";

@Pipe({
  name: 'topreviewhtml'
})
export class ToPreviewHtmlPipe implements PipeTransform {
  transform(value: string, options: HtmlExtractionOptions): InterfaceBlock[] {
    return HtmlExtractionMethods.transformHtmlStringToBlocks(value, options);
  }
}
