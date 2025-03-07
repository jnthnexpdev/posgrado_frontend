import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRevisionsComponent } from './list-revisions.component';

describe('ListRevisionsComponent', () => {
  let component: ListRevisionsComponent;
  let fixture: ComponentFixture<ListRevisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRevisionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRevisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
