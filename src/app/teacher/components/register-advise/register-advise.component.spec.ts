import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdviseComponent } from './register-advise.component';

describe('AddMentoredStudentComponent', () => {
  let component: RegisterAdviseComponent;
  let fixture: ComponentFixture<RegisterAdviseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAdviseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
