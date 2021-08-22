import { AuthGuard } from './../guards/auth-guard';
import { Router } from '@angular/router';
import { InstructorAuthGuard } from './../guards/instructor-auth-guard';
import { routeInformation } from './../environments/environment';
import { RouteInformation } from './../app/models/routing-models';
import { RouteGroup, UserType } from '../enums/app-enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

constructor(private router: Router) { }

  public getGeneralRoutes(userType: UserType, routeGroup: RouteGroup): RouteInformation[] {
    let authGuards: any[] = [undefined, undefined, InstructorAuthGuard, undefined];
    let routeInfo: RouteInformation[] = [];
    this.router.config.forEach(
      x => {
        if(x.canActivate !== undefined) {
          if(x.canActivate[0] === authGuards[userType] || x.canActivate[0] === AuthGuard) {
            if(x.path !== undefined) {
              routeInformation.forEach(
                y => {
                  if(x.path === y.routeUrl && y.routeGroup === routeGroup) {
                    routeInfo.push(y);
                  }
                }
              );
            }
          }
        }
      }
    );
    return routeInfo;
  }

}
