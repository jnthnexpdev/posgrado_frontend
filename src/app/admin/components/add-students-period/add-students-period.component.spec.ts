import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsPeriodComponent } from './add-students-period.component';

describe('AddStudentsPeriodComponent', () => {
  let component: AddStudentsPeriodComponent;
  let fixture: ComponentFixture<AddStudentsPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentsPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
