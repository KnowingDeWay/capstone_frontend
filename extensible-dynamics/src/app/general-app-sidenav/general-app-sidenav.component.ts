import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserType } from 'src/enums/app-enums';
import { environment } from 'src/environments/environment';
import { RoutingService } from 'src/services/routing.service';
import { RouteInformation } from '../models/routing-models';

@Component({
  selector: 'app-general-app-sidenav',
  templateUrl: './general-app-sidenav.component.html',
  styleUrls: ['./general-app-sidenav.component.css']
})
export class GeneralAppSidenavComponent implements OnInit {

  private encodedToken: string = '';
  private token: any = undefined;
  private tokenService: JwtHelperService = new JwtHelperService();
  public routeInfo: RouteInformation[] = [];

  constructor(private routeService: RoutingService, private cookieService: CookieService) {
    this.encodedToken = cookieService.get(environment.tokenCookieName);
    this.token = this.tokenService.decodeToken(this.encodedToken);
    let userType = this.token.user_type as UserType;
    this.routeInfo = this.routeInfo.concat(this.routeService.getGeneralRoutes(userType));
  }

  ngOnInit() {
  }

}
