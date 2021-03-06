import { Observable, Subscriber, Subscription } from 'rxjs';
import { environment } from './../../environments/environment';
import { CanvasPatService } from './../../services/canvas-pat.service';
import { ListResponse } from './../models/response-models';
import { CanvasPersonalAccessToken } from './../models/entity-models';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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

export interface EditPatDialogData {
  pat: CanvasPersonalAccessToken,
  encodedToken: string
}

export interface DeletePatDialogData {
  patId: number,
  encodedToken: string
}

@Component({
  selector: 'app-canvas-pat',
  templateUrl: './canvas-pat.component.html',
  styleUrls: ['./canvas-pat.component.css']
})
export class CanvasPatComponent implements OnInit, OnDestroy {

  public userPats: CanvasPersonalAccessToken[] = [];
  private listRes!: ListResponse<CanvasPersonalAccessToken>;
  private encodedToken: string = '';
  private patObservable!: Observable<CanvasPersonalAccessToken[]>;
  public activatingToken: boolean = false;
  public loadingResults: boolean = true;
  private subscription!: Subscription;
  private intervalHandle!: any;

  constructor(private cookieService: CookieService, private patService: CanvasPatService, private addPatDialog: MatDialog,
    private feedbackDialog: MatDialog, private editPatDialog: MatDialog, private deletePatDialog: MatDialog) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.patObservable = new Observable<CanvasPersonalAccessToken[]>(
      observer => {
        this.intervalHandle = setInterval(
          async () => {
            this.listRes = await this.patService.getUserPats(this.encodedToken);
            this.userPats = this.listRes.listContent;
            this.loadingResults = false;
          }
        , 1000);
      }
    );
    this.subscription = this.patObservable.subscribe();
  }
  ngOnDestroy() {
    clearInterval(this.intervalHandle);
    this.subscription.unsubscribe();
  }

  ngOnInit() {

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

  public openEditPatDialog(pat: CanvasPersonalAccessToken) {
    const dialogRef = this.editPatDialog.open(EditPatDialog, {
      width: '35%',
      data: {
        encodedToken: this.encodedToken,
        pat: pat
      },
      disableClose: true
    });
  }

  public openDeletePatDialog(patId: number) {
    const dialogRef = this.deletePatDialog.open(DeletePatDialog, {
      width: '35%',
      data: {
        encodedToken: this.encodedToken,
        patId: patId
      },
      disableClose: true
    });
  }

  openFeedbackDialog(response: string) {
    const dialogRef = this.feedbackDialog.open(PatFeedbackDialog, {
      width: '25%',
      data: {
        message: response,
        title: 'Canvas PATs'
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
  selector: 'edit-pat-dialog',
  templateUrl: 'edit-pat-dialog.html',
})
export class EditPatDialog {

  public tokenNameControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  public apiKeyControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(environment.canvasApiKeyLength),
    Validators.maxLength(environment.canvasApiKeyLength)
  ]);
  public editPatForm: FormGroup = this.formBuilder.group({
    tokenNameControl: this.tokenNameControl,
    apiKeyControl: this.apiKeyControl
  });
  public loadingState: boolean = false;
  public newPat: CanvasPersonalAccessToken = {
    id: this.data.pat.id,
    tokenName: this.data.pat.tokenName,
    accessToken: this.data.pat.accessToken,
    appUserId: this.data.pat.appUserId,
    tokenActive: this.data.pat.tokenName
  };

  constructor(
    public dialogRef: MatDialogRef<EditPatDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditPatDialogData, private patService: CanvasPatService,
    private feedbackDialog: MatDialog, private formBuilder: FormBuilder) {
      this.editPatForm.setValue({
        tokenNameControl: this.data.pat.tokenName,
        apiKeyControl: this.data.pat.accessToken
      },
      {
        emitEvent: true
      });
    }

  async onConfirmClick(): Promise<void> {
    this.loadingState = true;
    let newPat: CanvasPersonalAccessToken = {
      id: this.data.pat.id,
      tokenName: this.editPatForm.get('tokenNameControl')?.value,
      accessToken: this.editPatForm.get('apiKeyControl')?.value,
      appUserId: this.data.pat.appUserId,
      tokenActive: this.data.pat.tokenActive
    };
    let response: string = await this.patService.editToken(newPat, this.data.encodedToken);
    const dialogRef = this.feedbackDialog.open(PatFeedbackDialog, {
      width: '25%',
      data: {
        message: response,
        title: 'Edit Canvas PAT'
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
  selector: 'delete-pat-dialog',
  templateUrl: 'delete-pat-dialog.html',
})
export class DeletePatDialog {

  public loadingState: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeletePatDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeletePatDialogData, private patService: CanvasPatService,
    private feedbackDialog: MatDialog) {}

  async onConfirmClick(): Promise<void> {
    let response: string = await this.patService.deleteToken(this.data.patId, this.data.encodedToken);
    const dialogRef = this.feedbackDialog.open(PatFeedbackDialog, {
      width: '25%',
      data: {
        message: response,
        title: 'Delete Canvas PAT'
      }
    });
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
