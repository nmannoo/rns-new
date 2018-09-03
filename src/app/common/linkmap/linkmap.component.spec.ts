import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkmapComponent } from './linkmap.component';

describe('LinkmapComponent', () => {
  let component: LinkmapComponent;
  let fixture: ComponentFixture<LinkmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
