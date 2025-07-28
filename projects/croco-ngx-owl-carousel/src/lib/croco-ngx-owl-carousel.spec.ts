import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxOwlCarouselOModule } from './croco-ngx-owl-carousel'

describe('NgxOwlCarouselOModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxOwlCarouselOModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgxOwlCarouselOModule).toBeDefined();
  });
});
