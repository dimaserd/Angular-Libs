import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ecc-chat-button-template',
  templateUrl: './button-template.component.html',
  styleUrls: ['./button-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
  ]
})
export class ButtonTemplateComponent {
  @Input() public type: 'submit' | 'reset' | 'button' = 'button';
  @Input() public colorType: 'default' | 'light' = 'default'
  @Input() public buttonColor: 'blue' | 'pink' = 'pink'
  @Input() public disabled = false;
}
