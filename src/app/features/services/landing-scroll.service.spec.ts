import { TestBed } from '@angular/core/testing';

import { LandingScrollService } from './landing-scroll.service';

describe('LandingScrollService', () => {
  let service: LandingScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
