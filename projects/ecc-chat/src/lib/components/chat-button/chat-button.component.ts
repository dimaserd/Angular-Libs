import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatSymbolSpritePipe } from '../../pipes/chat-symbol-sprite.pipe';
import { ButtonTemplateComponent } from "./button-template/button-template.component";

@Component({
  selector: 'ecc-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss'],
  standalone: true,
  imports: [ChatSymbolSpritePipe, ButtonTemplateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatButtonComponent {
  @Input() public disabled = false;
  @Input() public messagesCount?: number;
  @Input() public text = "Перейти в чат";

  public get speechBalloonText(): string {
    return typeof this.messagesCount === 'number' ? (this.messagesCount > 99 ? '99+' : `${this.messagesCount}`) : '';
  }
}
