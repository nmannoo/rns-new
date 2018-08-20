import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalMarketComponent } from './regional-market.component';

describe('RegionalMarketComponent', () => {
  let component: RegionalMarketComponent;
  let fixture: ComponentFixture<RegionalMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
