/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanvasPatService } from './canvas-pat.service';

describe('Service: CanvasPat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasPatService]
    });
  });

  it('should ...', inject([CanvasPatService], (service: CanvasPatService) => {
    expect(service).toBeTruthy();
  }));
});
