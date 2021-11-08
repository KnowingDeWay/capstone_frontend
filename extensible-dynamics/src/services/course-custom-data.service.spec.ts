import { TestBed } from '@angular/core/testing';

import { CourseCustomDataService } from './course-custom-data.service';

describe('CourseCustomDataService', () => {
  let service: CourseCustomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseCustomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
