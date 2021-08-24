import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CoursesComponent } from './courses/courses.component';
import { CanvasPatComponent } from './canvas-pat/canvas-pat.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './../guards/auth-guard';
import { UserHomeComponent } from './user-home/user-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: environment.loginPageUrl, component: LoginComponent },
  { path: environment.profilePageUrl, component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: environment.canvasPatUrl, component: CanvasPatComponent, canActivate: [AuthGuard] },
  { path: environment.canvasCoursesUrl, component: CoursesComponent, canActivate: [AuthGuard] },
  { path: environment.courseOverviewUrl, component: CourseOverviewComponent, canActivate: [AuthGuard] },
  { path: environment.courseAssignmentsUrl, component: ViewAssignmentsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
