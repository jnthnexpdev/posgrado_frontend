import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTesisComponent } from './edit-tesis.component';

describe('EditTesisComponent', () => {
  let component: EditTesisComponent;
  let fixture: ComponentFixture<EditTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
