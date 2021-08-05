import { InstructorAuthGuard } from './../guards/instructor-auth-guard';
import { UserHomeComponent } from './user-home/user-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'instructoruserhome', component: UserHomeComponent, canActivate: [InstructorAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
