import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { AuthResponse } from './../models/response-models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { RoutingService } from './../../services/routing.service';
import { RouteInformation } from 'src/app/models/routing-models';
import { Component, OnInit, Inject } from '@angular/core';
import { UserType } from 'src/enums/app-enums';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LogoutDialogData {
  message: string
}

@Component({
  selector: 'app-general-app-navbar',
  templateUrl: './general-app-navbar.component.html',
  styleUrls: ['./general-app-navbar.component.css']
})
export class GeneralAppNavbarComponent implements OnInit {

  private routeInfo: RouteInformation[] = [];
  private encodedToken: string = '';
  private token: any = undefined;
  private tokenService: JwtHelperService = new JwtHelperService();
  public isLoggingOut: boolean;

  constructor(private routeService: RoutingService, private cookieService: CookieService,
    private authService: AuthenticationService, private router: Router, private logoutDialog: MatDialog) {
    this.encodedToken = cookieService.get(environment.tokenCookieName);
    this.token = this.tokenService.decodeToken(this.encodedToken);
    let userType = this.token.user_type as UserType;
    this.routeInfo.concat(this.routeService.getGeneralRoutes(userType));
    this.isLoggingOut = false;
  }

  ngOnInit() {
  }

  public async logout() {
    this.isLoggingOut = true;
    console.log(this.encodedToken);
    let response: AuthResponse = await this.authService.logout(this.encodedToken);
    if(response.responseToken.length === 0) {
      this.cookieService.delete(environment.tokenCookieName);
      this.router.navigateByUrl(environment.loginPageUrl);
    }
    else {
      this.openDialog(response.responseMessage);
    }
    this.isLoggingOut = false;
  }

  openDialog(message: string) {
    const dialogRef = this.logoutDialog.open(LogoutDialog, {
      width: '25%',
      data: {message: message}
    });
  }

}

@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
})
export class LogoutDialog {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LogoutDialogData) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
