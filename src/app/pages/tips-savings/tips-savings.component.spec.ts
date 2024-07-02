import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsSavingsComponent } from './tips-savings.component';

describe('TipsSavingsComponent', () => {
  let component: TipsSavingsComponent;
  let fixture: ComponentFixture<TipsSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsSavingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
