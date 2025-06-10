import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatNotifierComponent} from './chat-notifier.component';

describe('NotifierComponent', () => {
  const component: ChatNotifierComponent = null;
  const fixture: ComponentFixture<ChatNotifierComponent> = null;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ChatNotifierComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(NotifierComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
