import { TestBed } from '@angular/core/testing';

import { CanvasGradebookDataService } from './canvas-gradebook-data.service';

describe('CanvasGradebookDataService', () => {
  let service: CanvasGradebookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasGradebookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
