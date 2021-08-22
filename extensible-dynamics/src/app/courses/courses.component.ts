import { RouteGroup } from './../../enums/app-enums';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { environment } from './../../environments/environment';
import { ListResponse } from './../models/response-models';
import { CanvasCoursesService } from 'src/services/canvas-courses.service';
import { Course } from 'src/app/models/canvas-models';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  public loadingResults: boolean = true;
  private encodedToken: string = '';
  private patObservable!: Observable<Course[]>;
  private listRes!: ListResponse<Course>;
  public courses: Course[] = [];
  public env: any = environment;
  private subscription!: Subscription;
  private clearInterval: boolean = false;

  constructor(private cookieService: CookieService, private courseService: CanvasCoursesService) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.patObservable = new Observable<Course[]>(
      observer => {
        let handle = setInterval(
          async () => {
            this.listRes = await this.courseService.GetInstructorCourses(this.encodedToken);
            this.courses = this.listRes.listContent;
            this.loadingResults = false;
            if(this.clearInterval) {
              clearInterval(handle);
            }
          }
        , 1000);
      }
    );
    this.subscription = this.patObservable.subscribe();
  }

  ngOnDestroy() {
    this.clearInterval = true;
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }

}
