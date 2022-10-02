import { Pipe, PipeTransform } from '@angular/core';
import { HtmlExtractionMethods } from '../extensions/HtmlExtractionMethods';
import { InterfaceBlock } from "../extensions/InterfaceBlock";

@Pipe({
  name: 'topreview'
})
export class ToPreviewPipe implements PipeTransform {
  transform(value: string): InterfaceBlock[] {
    return HtmlExtractionMethods.transformHtmlStringToBlocks(value);
  }
}
