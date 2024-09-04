import { Inject, Pipe, PipeTransform } from '@angular/core';
import { HtmlExtractionMethods, CrocoHtmlOptions } from '../extensions/HtmlExtractionMethods';
import { InterfaceBlock } from "../extensions/InterfaceBlock";
import { CrocoHtmlOptionsToken } from '../consts';

@Pipe({
    name: 'topreviewhtml',
    standalone: true
})
export class ToPreviewHtmlPipe implements PipeTransform {

  constructor(@Inject(CrocoHtmlOptionsToken) private readonly _options: CrocoHtmlOptions) {
  }

  transform(value: string): InterfaceBlock[] {
    return HtmlExtractionMethods.transformHtmlStringToBlocks(value, this._options);
  }
}
