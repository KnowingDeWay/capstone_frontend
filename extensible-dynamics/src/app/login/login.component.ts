import { CookieService } from 'ngx-cookie-service';
import { LoginCredentials } from './../models/request-models';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthResponse } from './../models/response-models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { AuthGuard } from '../../guards/auth-guard';
import { Router } from '@angular/router';


export interface LoginDialogData {
  message: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, AuthGuard]
})
export class LoginComponent implements OnInit {

  loginRequest: LoginCredentials = {
    username: '',
    password: ''
  };

  userFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9]+$')
  ])

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ])

  loadingState: boolean;

  constructor(private authService: AuthenticationService, public loginDialog: MatDialog,
    private cookieService: CookieService, private authGuard: AuthGuard, private router: Router) {
    this.loadingState = false;
  }

  ngOnInit(): void {
    if(this.authGuard.canActivate()) {
      let encodedToken = this.cookieService.get(environment.tokenCookieName);
      this.router.navigateByUrl('instructoruserhome');
    }
  }

  public async login() {
    this.loadingState = true;
    let authResponse: AuthResponse = await this.authService.login(this.loginRequest);
    // Display dialog box if no token is received
    if(authResponse.responseToken.length === 0) {
      this.openDialog(authResponse.responseMessage);
    }
    else {
      // Otherwise add a cookie with the app token
      this.cookieService.set(environment.tokenCookieName, authResponse.responseToken);
      let encodedToken = this.cookieService.get(environment.tokenCookieName);
      this.router.navigateByUrl('instructoruserhome');
    }
    this.loadingState = false;
  }

  public updateUsername(event: string) {
    this.loginRequest.username = (event !== undefined) ? event : this.loginRequest.username;
  }

  public updatePassword(event: string) {
    this.loginRequest.password = (event !== undefined) ? event : this.loginRequest.password;
  }

  openDialog(message: string) {
    const dialogRef = this.loginDialog.open(LoginDialog, {
      width: '25%',
      data: {message: message}
    });
  }

}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
