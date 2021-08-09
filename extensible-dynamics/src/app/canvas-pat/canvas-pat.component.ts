import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { CanvasPatService } from './../../services/canvas-pat.service';
import { ListResponse } from './../models/response-models';
import { CanvasPersonalAccessToken } from './../models/entity-models';
import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CanvasToken } from '../models/request-models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export interface AddPatDialogData {
  encodedToken: string
}

export interface PatFeedbackDialogData {
  message: string,
  title: string
}

@Component({
  selector: 'app-canvas-pat',
  templateUrl: './canvas-pat.component.html',
  styleUrls: ['./canvas-pat.component.css']
})
export class CanvasPatComponent implements OnInit {

  public userPats: CanvasPersonalAccessToken[] = [];
  private listRes!: ListResponse<CanvasPersonalAccessToken>;
  private encodedToken: string = '';
  private patObservable!: Observable<CanvasPersonalAccessToken[]>;
  public activatingToken: boolean = false;

  constructor(private cookieService: CookieService, private patService: CanvasPatService, private addPatDialog: MatDialog,
    private feedbackDialog: MatDialog) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.patObservable = new Observable<CanvasPersonalAccessToken[]>(
      observer => {
        setInterval(async () => {
          this.listRes = await this.patService.getUserPats(this.encodedToken);
          this.userPats = this.listRes.listContent;
        }, 1000);
      }
    );
  }

  async ngOnInit(): Promise<void> {
    this.patObservable.subscribe();
  }

  public openAddPatDialog() {
    const dialogRef = this.addPatDialog.open(AddPatDialog, {
      width: '35%',
      data: {
        encodedToken: this.encodedToken
      },
      disableClose: true
    });
  }

  public async activateToken(patId: number) {
    this.activatingToken = true;
    let response: string = await this.patService.activateToken(this.encodedToken, patId);
    this.activatingToken = false;
    const dialogRef = this.feedbackDialog.open(PatFeedbackDialog, {
      width: '25%',
      data: {
        message: response,
        title: 'PAT Activation'
      }
    });
  }

}

@Component({
  selector: 'add-pat-dialog',
  templateUrl: 'add-pat-dialog.html',
})
export class AddPatDialog {

  public tokenNameControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  public apiKeyControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(environment.canvasApiKeyLength),
    Validators.maxLength(environment.canvasApiKeyLength)
  ]);
  public addPatForm: FormGroup = this.formBuilder.group({
    tokenNameControl: this.tokenNameControl,
    apiKeyControl: this.apiKeyControl
  });
  public loadingState: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddPatDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddPatDialogData, private patService: CanvasPatService,
    private feedbackDialog: MatDialog, private formBuilder: FormBuilder) {
    }

  async onConfirmClick(): Promise<void> {
    this.loadingState = true;
    let newPat: CanvasToken = {
      tokenName: this.addPatForm.get('tokenNameControl')?.value,
      apiKey: this.addPatForm.get('apiKeyControl')?.value
    };
    let response: string = await this.patService.addToken(newPat, this.data.encodedToken);
    const dialogRef = this.feedbackDialog.open(PatFeedbackDialog, {
      width: '25%',
      data: {
        message: response,
        title: 'Add New Canvas PAT'
      }
    });
    this.loadingState = false;
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'pat-feedback-dialog',
  templateUrl: 'pat-feedback-dialog.html',
})
export class PatFeedbackDialog {

  constructor(
    public dialogRef: MatDialogRef<PatFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PatFeedbackDialogData) {}

  onConfirmClick(): void {

    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
