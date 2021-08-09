import { CanvasPatComponent } from './canvas-pat/canvas-pat.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './../guards/auth-guard';
import { InstructorAuthGuard } from './../guards/instructor-auth-guard';
import { UserHomeComponent } from './user-home/user-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: environment.loginPageUrl, component: LoginComponent },
  { path: environment.profilePageUrl, component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: environment.canvasPatUrl, component: CanvasPatComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
