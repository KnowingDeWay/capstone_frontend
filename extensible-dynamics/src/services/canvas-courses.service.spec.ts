/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanvasCoursesService } from './canvas-courses.service';

describe('Service: CanvasCourses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasCoursesService]
    });
  });

  it('should ...', inject([CanvasCoursesService], (service: CanvasCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
