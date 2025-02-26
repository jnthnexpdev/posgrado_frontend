import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAssignmentComponent } from './details-assignment.component';

describe('DetailsRevisionComponent', () => {
  let component: DetailsAssignmentComponent;
  let fixture: ComponentFixture<DetailsAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
