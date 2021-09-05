import { Observable, Subscription } from 'rxjs';
import { CourseDataTable, ICourseDataTable } from './../models/data-structures';
import { ObjectResponse } from './../models/response-models';
import { Router } from '@angular/router';
import { Course } from './../models/canvas-models';
import { CanvasGradebookDataService } from './../../services/canvas-gradebook-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-tabs',
  templateUrl: './course-tabs.component.html',
  styleUrls: ['./course-tabs.component.css']
})
export class CourseTabsComponent implements OnInit, OnDestroy {

  public title: string = '';
  public course!: Course;
  private encodedToken: string = '';
  public objectResponse!: ObjectResponse<ICourseDataTable>;
  public gradebook!: CourseDataTable;
  private gradebookObservable!: Observable<any>;
  public loadingResults: boolean = true;
  private subscription!: Subscription;
  private interval: any;
  public dataSource: any;
  public displayedColumns: string[] = [];

  constructor(private cookieService: CookieService, private gradebookService: CanvasGradebookDataService,
    private router: Router) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
    if(this.course != null && this.course !== undefined) {
      this.gradebookService.GetCourseDataTable(this.course.id, this.encodedToken).then(
        x => {
          if(x.value !== undefined) {
            this.gradebook = new CourseDataTable(x.value);
            this.dataSource = this.gradebook.toTableDataSource();
            console.log(this.gradebook);
            console.log(this.dataSource);
            this.displayedColumns = this.gradebook.columnNames;
          }
          this.loadingResults = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setTitle() {
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
      this.title = `${this.course.name} - Gradebook`;
    }
  }

  ngOnInit() {

  }

}
