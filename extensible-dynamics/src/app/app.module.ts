import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from 'src/services/routing.service';
import { UserService } from 'src/services/user-service.service';
import { CanvasPatService } from 'src/services/canvas-pat.service';
import { CanvasCoursesService } from 'src/services/canvas-courses.service';
import { CanvasAssignmentService } from './../services/canvas-assignment.service';
import { CanvasGradebookDataService } from 'src/services/canvas-gradebook-data.service';

import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { GeneralAppNavbarComponent } from './general-app-navbar/general-app-navbar.component';
import { GeneralAppSidenavComponent } from './general-app-sidenav/general-app-sidenav.component';
import { CanvasPatComponent } from './canvas-pat/canvas-pat.component';
import { AddPatDialog } from 'src/app/canvas-pat/canvas-pat.component';
import { EditPatDialog } from 'src/app/canvas-pat/canvas-pat.component';
import { DeletePatDialog } from 'src/app/canvas-pat/canvas-pat.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { CourseTabsComponent } from './course-tabs/course-tabs.component';
import { CellEditPopupComponent } from './cell-edit-popup/cell-edit-popup.component';
import { TabFeedbackDialog } from './course-tabs/course-tabs.component';
import { TabLoadingFeedbackDialog } from './course-tabs/course-tabs.component';
import { AddColumnDialog } from './course-tabs/course-tabs.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserHomeComponent,
    GeneralAppNavbarComponent,
    GeneralAppSidenavComponent,
    CanvasPatComponent,
    AddPatDialog,
    EditPatDialog,
    DeletePatDialog,
    CoursesComponent,
    CourseOverviewComponent,
    ViewAssignmentsComponent,
    CourseTabsComponent,
    CellEditPopupComponent,
    TabFeedbackDialog,
    TabLoadingFeedbackDialog,
    AddColumnDialog
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    SatPopoverModule,
    FormsModule,
    MatSelectModule,
    NgxMatFileInputModule
  ],
  providers: [
    CookieService,
    AuthenticationService,
    RoutingService,
    UserService,
    CanvasPatService,
    CanvasCoursesService,
    CanvasAssignmentService,
    CanvasGradebookDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
