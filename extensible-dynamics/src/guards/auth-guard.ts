import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private cookieService: CookieService, private authService: AuthenticationService, private router: Router) {

  }

  async canActivate(): Promise<boolean> {
    if(this.cookieService.check(environment.tokenCookieName)) {
      let encodedToken = this.cookieService.get(environment.tokenCookieName);
      let token = this.jwtService.decodeToken(encodedToken);
      if(token === undefined) {
        this.cookieService.delete(environment.tokenCookieName);
        return false;
      }
      if(this.jwtService.isTokenExpired(encodedToken)) {
        this.cookieService.delete(environment.tokenCookieName);
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
      return true;
    }
    return false;
  }
}
