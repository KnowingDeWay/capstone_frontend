import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/canvas-models';
import { CanvasUserService } from './../../services/canvas-user.service';
import { ListResponse } from 'src/app/models/response-models';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/canvas-models';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-course-data',
  templateUrl: './custom-course-data.component.html',
  styleUrls: ['./custom-course-data.component.css']
})
export class CustomCourseDataComponent implements OnInit, OnDestroy, AfterViewInit {

  public canvasStudentObsv!: Observable<User[]>;
  private intervalHandle!: any;
  public listRes!: ListResponse<User>;
  public students: User[] = [];
  public course!: Course;
  private encodedToken: string = '';
  public title: string = '';
  public loading: boolean = true;
  public subscription!: Subscription
  public dataSource = new MatTableDataSource<User>(this.students);
  public displayedCols: string[] = ['name', 'email', 'lastlogin'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private canvasUserService: CanvasUserService, private router: Router, private cookieService: CookieService) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
    if(this.course != null && this.course !== undefined) {
      this.canvasStudentObsv = new Observable<User[]>(
        () => {
          this.intervalHandle = setInterval(
            async () => {
              this.listRes = await this.canvasUserService.getCourseStudents(this.course.id, this.encodedToken,
                this.paginator.pageIndex + 1);
              this.students = this.listRes.listContent;
              this.dataSource = new MatTableDataSource<User>(this.students);
              this.loading = false;
            }
          , 3000);
        }
      );
      this.subscription = this.canvasStudentObsv.subscribe();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
    this.subscription.unsubscribe();
  }

  public formatDate(date?: Date): string {
    if(date === undefined) {
      return "";
    }
    let newDate = new Date(date);
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
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

}
