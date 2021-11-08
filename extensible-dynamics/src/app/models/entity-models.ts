import { UserType, CustomDataType } from 'src/enums/app-enums';

export interface UserProfile {
  appUserName: string,
  userType: UserType
}

export interface CanvasPersonalAccessToken {
  id: number,
  tokenName: string,
  accessToken: string,
  appUserId: number,
  tokenActive: string,
}

export interface UserCustomDataEntry {
  itemName: string,
  content: string,
  dataType: CustomDataType,
  scopeId: number,
  userId: number,
  courseId: number
}

export interface Scope {
  name: string,
  userId: number,
  customDataEntries: UserCustomDataEntry[],
  courseId: number
}
