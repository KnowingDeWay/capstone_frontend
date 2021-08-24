/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanvasAssignmentService } from './canvas-assignment.service';

describe('Service: CanvasAssignment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasAssignmentService]
    });
  });

  it('should ...', inject([CanvasAssignmentService], (service: CanvasAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
