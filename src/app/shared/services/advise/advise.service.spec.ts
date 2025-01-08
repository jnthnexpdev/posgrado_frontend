import { TestBed } from '@angular/core/testing';

import { AdviseService } from './advise.service';

describe('AdviseService', () => {
  let service: AdviseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
