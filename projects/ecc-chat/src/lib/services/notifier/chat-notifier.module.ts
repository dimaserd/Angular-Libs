import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatNotifierService} from './chat-notifier.service';
import {ChatNotifierComponent} from './chat-notifier.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotifierSetting} from './chat-notifier.model';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ChatNotifierComponent
    ],
    exports: [
        ChatNotifierComponent
    ],
})
export class ChatNotifierModule {
  public static forRoot(setting?: NotifierSetting): ModuleWithProviders<ChatNotifierModule> {
    return {
      ngModule: ChatNotifierModule,
      // services that should stay and be exported as singletons, not instantiated second time for child app modules
      providers: [
        ChatNotifierService,
        {
          provide: 'notifierSetting',
          useValue: setting ? setting : {}
        }
      ]
    };
  }
}
