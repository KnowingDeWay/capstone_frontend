import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCourseDataComponent } from './custom-course-data.component';

describe('CustomCourseDataComponent', () => {
  let component: CustomCourseDataComponent;
  let fixture: ComponentFixture<CustomCourseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCourseDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCourseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
