import { TestBed } from '@angular/core/testing';

import { CustomercardService } from './customercard.service';

describe('CustomercardService', () => {
  let service: CustomercardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomercardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
