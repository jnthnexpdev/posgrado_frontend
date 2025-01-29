import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPeriodComponent } from './register-period.component';

describe('RegisterPeriodComponent', () => {
  let component: RegisterPeriodComponent;
  let fixture: ComponentFixture<RegisterPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
