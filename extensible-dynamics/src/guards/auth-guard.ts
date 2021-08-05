import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserType } from '../enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private cookieService: CookieService) {

  }

  canActivate(): boolean {
    if(this.cookieService.check(environment.tokenCookieName)) {
      let encodedToken = this.cookieService.get(environment.tokenCookieName);
      let token = this.jwtService.decodeToken(encodedToken);
      if(token === undefined) {
        return false;
      }
      if(this.jwtService.isTokenExpired(encodedToken)) {
        return false;
      }
      return true;
    }
    return false;
  }
}
