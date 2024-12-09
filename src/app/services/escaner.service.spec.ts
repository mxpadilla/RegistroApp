import { TestBed } from '@angular/core/testing';

import { EscanerService } from './escaner.service';

describe('EscanerService', () => {
  let service: EscanerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscanerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
