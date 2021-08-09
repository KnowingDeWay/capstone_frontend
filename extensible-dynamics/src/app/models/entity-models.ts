import { UserType } from 'src/enums/app-enums';

export interface UserProfile {
  appUserName: string,
  userType: UserType
}

export interface CanvasPersonalAccessToken {
  id: number,
  tokenName: string,
  accessToken: string,
  appUserId: number,
  tokenActive: string
}
