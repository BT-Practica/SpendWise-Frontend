import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIncomesComponent } from './dialog-incomes.component';

describe('DialogIncomesComponent', () => {
  let component: DialogIncomesComponent;
  let fixture: ComponentFixture<DialogIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogIncomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
