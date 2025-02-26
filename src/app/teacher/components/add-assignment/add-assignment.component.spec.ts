import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingRevisionComponent } from './add-assignment.component';

describe('AssingRevisionComponent', () => {
  let component: AssingRevisionComponent;
  let fixture: ComponentFixture<AssingRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssingRevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssingRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
