import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeriodsComponent } from './list-periods.component';

describe('ListPeriodsComponent', () => {
  let component: ListPeriodsComponent;
  let fixture: ComponentFixture<ListPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPeriodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
