import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeHomeComponent } from './income-home.component';

describe('IncomeHomeComponent', () => {
  let component: IncomeHomeComponent;
  let fixture: ComponentFixture<IncomeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
