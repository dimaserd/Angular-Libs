import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'croco-html-error-banner',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.css'
})
export class ErrorBannerComponent {
  @Input({ required: true }) 
  message: string = "";
}
