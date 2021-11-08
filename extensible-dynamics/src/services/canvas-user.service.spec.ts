import { TestBed } from '@angular/core/testing';

import { CanvasUserService } from './canvas-user.service';

describe('CanvasUserService', () => {
  let service: CanvasUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
