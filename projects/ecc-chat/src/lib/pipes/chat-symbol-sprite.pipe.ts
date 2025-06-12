import { Pipe, PipeTransform } from '@angular/core';
import { EccChatSpriteIdsType } from '../../chat-sprite-ids.type';


@Pipe({
  name: 'chatSymbolSprite',
  standalone: true,
})
export class ChatSymbolSpritePipe implements PipeTransform {
  transform(id: EccChatSpriteIdsType): string {
    return `assets/chat-sprites/symbol/chat-html-svg-sprite.svg#${id}`;
  }
}
