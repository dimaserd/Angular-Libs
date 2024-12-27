import { Pipe, PipeTransform } from "@angular/core";
import { SpriteIdsType } from "../../sprites-ids.type";

@Pipe({
  name: 'spriteIconPath',
  standalone: true,
})
export class SpriteIconPathPipe implements PipeTransform {
  transform(id: SpriteIdsType): string {
    return `assets/lib-sprites/symbol/croco-html-svg-sprite.svg#${id}`;
  }
}
