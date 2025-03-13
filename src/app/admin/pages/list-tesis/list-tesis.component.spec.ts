import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTesisComponent } from './list-tesis.component';

describe('ListTesisComponent', () => {
  let component: ListTesisComponent;
  let fixture: ComponentFixture<ListTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
