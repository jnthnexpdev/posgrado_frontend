import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicationComponent } from './register-publication.component';

describe('RegisterPublicationComponent', () => {
  let component: RegisterPublicationComponent;
  let fixture: ComponentFixture<RegisterPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
