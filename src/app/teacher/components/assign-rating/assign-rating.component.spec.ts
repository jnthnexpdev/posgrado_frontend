import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRatingComponent } from './assign-rating.component';

describe('AssignRatingComponent', () => {
  let component: AssignRatingComponent;
  let fixture: ComponentFixture<AssignRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
