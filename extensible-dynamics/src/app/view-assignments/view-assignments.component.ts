import { GeneralAppSidenavComponent } from './../general-app-sidenav/general-app-sidenav.component';
import { Router } from '@angular/router';
import { Assignment, Course } from './../models/canvas-models';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ListResponse } from '../models/response-models';
import { environment } from 'src/environments/environment';
import { CanvasAssignmentService } from 'src/services/canvas-assignment.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit, OnDestroy {

  public title: string = '';
  public loadingResults: boolean = true;
  private encodedToken: string = '';
  private assignmentObservable!: Observable<Assignment[]>;
  private listRes!: ListResponse<Assignment>;
  public assignments: Assignment[] = [];
  public env: any = environment;
  private subscription!: Subscription;
  private intervalHandle!: any;
  public course!: Course;

  constructor(private cookieService: CookieService, private assignmentService: CanvasAssignmentService,
    private router: Router) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
    if(this.course != null && this.course !== undefined) {
      this.assignmentObservable = new Observable<Assignment[]>(
        () => {
          this.intervalHandle = setInterval(
            async () => {
              this.listRes = await this.assignmentService.getCourseAssignments(this.encodedToken, this.course.id);
              this.assignments = this.listRes.listContent;
              this.loadingResults = false;
            }
          , 1000);
        }
      );
      this.subscription = this.assignmentObservable.subscribe();
    }
    else {
      console.log('Unable to retreive course');
    }
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
      this.title = `${this.course.name} - Overview`;
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalHandle);
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }

  public formatDate(date?: Date): string {
    if(date === undefined) {
      return "";
    }
    let newDate = new Date(date);
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
  }

  public isOverdue(currDate?: Date): boolean {
    if(currDate === undefined) {
      return false;
    }
    let newDate = new Date(currDate);
    return Date.now() > newDate.getTime();
  }

  public openEditWindow(assignmentId: number) {
    window.open(`${environment.canvasBaseInfrastructureUrl}/courses/${this.course.id}/assignments/${assignmentId}/edit`);
  }

}
