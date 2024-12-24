import { Pipe, PipeTransform } from "@angular/core";
import { spritesHash } from "../../sprites-hash";
import { SpriteIdsType } from "../../sprites-ids.type";

@Pipe({
  name: 'spriteIconPath',
  standalone: true,
})
export class SpriteIconPathPipe implements PipeTransform {
  transform(id: SpriteIdsType): string {

    const hashString = spritesHash.useHash ? `-${spritesHash.symbol}` : '';

    return `assets/lib-sprites/symbol/croco-html-svg-sprite${hashString}.svg#${id}`;
  }
}
