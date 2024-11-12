import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { qrGuardGuard } from './qr-guard.guard';

describe('qrGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => qrGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
