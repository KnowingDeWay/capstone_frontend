import { RouteGroup } from './../../enums/app-enums';

export interface RouteInformation {
  routeName: string,
  routeUrl: string,
  iconName: string | undefined,
  routeGroup: RouteGroup
}
