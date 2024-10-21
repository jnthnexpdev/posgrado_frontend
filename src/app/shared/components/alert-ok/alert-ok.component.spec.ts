import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertOkComponent } from './alert-ok.component';

describe('AlertOkComponent', () => {
  let component: AlertOkComponent;
  let fixture: ComponentFixture<AlertOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertOkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
