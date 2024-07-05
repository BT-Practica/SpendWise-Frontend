import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipdetailComponent } from './tipdetail.component';

describe('TipdetailComponent', () => {
  let component: TipdetailComponent;
  let fixture: ComponentFixture<TipdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
