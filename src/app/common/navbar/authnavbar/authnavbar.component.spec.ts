import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthnavbarComponent } from './authnavbar.component';

describe('AuthnavbarComponent', () => {
  let component: AuthnavbarComponent;
  let fixture: ComponentFixture<AuthnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthnavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
