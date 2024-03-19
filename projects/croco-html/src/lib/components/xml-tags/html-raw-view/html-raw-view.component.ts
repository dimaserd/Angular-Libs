import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'croco-html-raw-view',
  templateUrl: './html-raw-view.component.html',
  styleUrls: ['./html-raw-view.component.css']
})
export class HtmlRawViewComponent implements OnInit {
  
  @Input()
  rawHtml = "";

  safeHtml : SafeHtml;
  isInitialized = false; 

  constructor(private readonly _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this._sanitizer.bypassSecurityTrustHtml(this.rawHtml)
  }

  
}
