import { Router } from '@angular/router';
import { Course } from './../models/canvas-models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralAppSidenavComponent } from '../general-app-sidenav/general-app-sidenav.component';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  public title: string;
  public course!: Course;

  constructor(private router: Router) {
    this.title = '';
    let currNav = this.router.getCurrentNavigation();
    if(currNav != null) {
      if(currNav.extras.state !== undefined) {
        this.course = currNav.extras.state.data;
      }
      else {
        this.router.navigateByUrl(environment.canvasCoursesUrl);
      }
    }
    else {
      this.router.navigateByUrl(environment.canvasCoursesUrl);
    }
    if(this.course !== null) {
      this.title = `${this.course.name} - Overview`;
    }
  }

  ngOnInit(): void {

  }

  public formatDate(date?: Date): string {
    if(date === undefined) {
      return "";
    }
    let newDate = new Date(date);
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
  }

}
