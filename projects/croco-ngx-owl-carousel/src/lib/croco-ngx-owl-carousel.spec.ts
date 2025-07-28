import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrocoNgxOwlCarousel } from './croco-ngx-owl-carousel';

describe('CrocoNgxOwlCarousel', () => {
  let component: CrocoNgxOwlCarousel;
  let fixture: ComponentFixture<CrocoNgxOwlCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrocoNgxOwlCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrocoNgxOwlCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
