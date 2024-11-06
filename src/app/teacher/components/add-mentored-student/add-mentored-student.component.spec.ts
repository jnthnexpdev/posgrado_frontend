import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentoredStudentComponent } from './add-mentored-student.component';

describe('AddMentoredStudentComponent', () => {
  let component: AddMentoredStudentComponent;
  let fixture: ComponentFixture<AddMentoredStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMentoredStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMentoredStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
