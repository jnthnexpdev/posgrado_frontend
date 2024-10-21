import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRevisionComponent } from './details-revision.component';

describe('DetailsRevisionComponent', () => {
  let component: DetailsRevisionComponent;
  let fixture: ComponentFixture<DetailsRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
