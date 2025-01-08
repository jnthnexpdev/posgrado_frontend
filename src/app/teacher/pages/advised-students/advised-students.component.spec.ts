import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoredStudentsComponent } from './advised-students.component';

describe('MentoredStudentsComponent', () => {
  let component: MentoredStudentsComponent;
  let fixture: ComponentFixture<MentoredStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentoredStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentoredStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
