import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTesisComponent } from './register-tesis.component';

describe('RegisterTesisComponent', () => {
  let component: RegisterTesisComponent;
  let fixture: ComponentFixture<RegisterTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
