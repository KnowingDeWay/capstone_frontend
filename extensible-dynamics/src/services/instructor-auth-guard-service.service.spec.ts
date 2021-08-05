import { TestBed } from '@angular/core/testing';

import { InstructorAuthGuardService } from './instructor-auth-guard-service.service';

describe('InstructorAuthGuardService', () => {
  let service: InstructorAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
