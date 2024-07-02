import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthnavbarComponent } from './unauthnavbar.component';

describe('UnauthnavbarComponent', () => {
  let component: UnauthnavbarComponent;
  let fixture: ComponentFixture<UnauthnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthnavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
