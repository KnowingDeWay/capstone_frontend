import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserType } from '../enums/app-enums';
import { AuthenticationService } from '../services/authentication.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InstructorAuthGuard implements CanActivate {

  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private cookieService: CookieService, private router: Router, private authService: AuthenticationService) {

  }

  async canActivate(): Promise<boolean> {
    if(this.cookieService.check(environment.tokenCookieName)) {
      let encodedToken = this.cookieService.get(environment.tokenCookieName);
      let token = this.jwtService.decodeToken(encodedToken);
      if(token === undefined) {
        this.cookieService.delete(environment.tokenCookieName);
        this.router.navigateByUrl(environment.loginPageUrl);
        return false;
      }
      if(this.jwtService.isTokenExpired(encodedToken)) {
        this.cookieService.delete(environment.tokenCookieName);
        this.router.navigateByUrl(environment.loginPageUrl);
        return false;
      }
      // Check if token is valid on the back end
      let tokenValid: number = await this.authService.validateToken(encodedToken);
      if(tokenValid === -1) {
        return false;
      }
      if(tokenValid === 0) {
        this.cookieService.delete(environment.tokenCookieName);
        this.router.navigateByUrl(environment.loginPageUrl);
        return false;
      }
      let userType: UserType = Object.values(UserType).indexOf(token.user_type);
      // Check to see if the received enum is valid
      if(userType >= 0) {
        if(userType === UserType.Instructor) {
          return true;
        }
      }
      this.router.navigateByUrl(environment.loginPageUrl);
      return false;
    }
    this.router.navigateByUrl(environment.loginPageUrl);
    return false;
  }
}
