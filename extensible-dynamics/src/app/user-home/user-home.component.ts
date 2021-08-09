import { UserService } from './../../services/user-service.service';
import { UserProfile } from './../models/entity-models';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserType } from 'src/enums/app-enums';
import { environment } from 'src/environments/environment';
import { RoutingService } from 'src/services/routing.service';
import { RouteInformation } from '../models/routing-models';
import { ObjectResponse } from '../models/response-models';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface ProfileDialogData {
  message: string
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  private encodedToken: string = '';
  public objResponse!: ObjectResponse<UserProfile>;
  public profile!: UserProfile;

  constructor(private cookieService: CookieService, private userService: UserService, private profileDialog: MatDialog) {
    this.encodedToken = cookieService.get(environment.tokenCookieName);
  }

  async ngOnInit(): Promise<void> {
    this.objResponse = await this.userService.viewUserProfile(this.encodedToken);
    if(this.objResponse.value === undefined) {
      this.openDialog(this.objResponse.message);
    }
    else if(this.objResponse.value === null) {
      this.openDialog(this.objResponse.message);
    }
    else {
      this.profile = this.objResponse.value;
    }
  }

  openDialog(message: string) {
    const dialogRef = this.profileDialog.open(ProfileDialog, {
      width: '25%',
      data: {message: message}
    });
  }

  public getEnumName(userType: UserType) : string {
    let enumName: string = '';
    enumName = UserType[userType];
    return enumName;
  }

}

@Component({
  selector: 'profile-dialog',
  templateUrl: 'profile-dialog.html',
})
export class ProfileDialog {

  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
