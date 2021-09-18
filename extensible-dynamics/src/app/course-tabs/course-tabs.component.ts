import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColumnDataType, ColumnType, CourseDataTable, DataColumn, ICourseDataTable } from './../models/data-structures';
import { ObjectResponse } from './../models/response-models';
import { Router } from '@angular/router';
import { Course } from './../models/canvas-models';
import { CanvasGradebookDataService } from './../../services/canvas-gradebook-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewColumnRequest } from '../models/request-models';

export interface TabFeedbackDialogData {
  message: string;
  title: string;
}

export interface TabLoadingFeedbackData {
  message: string;
  title: string;
  gradebook: CourseDataTable;
  token: string;
}

export interface AddColumnDialogData {
  encodedToken: string,
  request: NewColumnRequest,
  courseId: number
}


@Component({
  selector: 'app-course-tabs',
  templateUrl: './course-tabs.component.html',
  styleUrls: ['./course-tabs.component.css']
})
export class CourseTabsComponent implements OnInit {

  public title: string = '';
  public course!: Course;
  private encodedToken: string = '';
  public objectResponse!: ObjectResponse<ICourseDataTable>;
  public gradebook!: CourseDataTable;
  public loadingResults: boolean = true;
  public dataSource: any[] = [];
  public displayedColumns: string[] = [];
  public submitting: boolean = false;

  constructor(private cookieService: CookieService, private gradebookService: CanvasGradebookDataService,
    private router: Router, private matDialog: MatDialog) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loadingResults = true;
    this.dataSource = [];
    if(this.course != null && this.course !== undefined) {
      await this.gradebookService.getCourseDataTable(this.course.id, this.encodedToken).then(
        x => {
          if(x.value !== undefined) {
            this.gradebook = new CourseDataTable(x.value);
            this.dataSource = this.gradebook.toTableDataSource();
            this.displayedColumns = this.gradebook.columnNames;
          }
          this.loadingResults = false;
        }
      );
    }
  }

  getColumnByName(name: string): DataColumn | undefined {
    return this.gradebook.get(name);
  }

  setTitle() {
    this.title = '';
    let currNav = this.router.getCurrentNavigation();
    if(currNav != null) {
      if(currNav.extras.state !== undefined) {
        this.course = currNav.extras.state.data;
      }
      else {
        this.router.navigateByUrl(environment.canvasCoursesUrl);
      }
    }
    else {
      this.router.navigateByUrl(environment.canvasCoursesUrl);
    }
    if(this.course !== null) {
      this.title = `${this.course.name} - Gradebook`;
    }
  }

  async submitValueChanges() {
    this.gradebook.alterTableByDataSource(this.dataSource);
    this.matDialog.open(
      TabLoadingFeedbackDialog, {
        width: '35%',
        data: {
          message: 'Submitting Changes...',
          title: 'Course Data Table',
          gradebook: this.gradebook,
          token: this.encodedToken
        },
        disableClose: true
      }
    );
  }

  clearChanges() {
    this.ngOnInit();
  }

  openAddNewColumnDialog() {
    const dialogRef = this.matDialog.open(AddColumnDialog, {
      width: '35%',
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.ngOnInit();
      }
    });
  }

}

@Component({
  selector: 'tab-feedback-dialog',
  templateUrl: 'tab-feedback-dialog.html',
})
export class TabFeedbackDialog {

  constructor(
    public dialogRef: MatDialogRef<TabFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TabFeedbackDialogData) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'loading-dialog',
  templateUrl: 'loading-dialog.html',
})
export class TabLoadingFeedbackDialog {

  public isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TabLoadingFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TabLoadingFeedbackData,
    private gradebookService: CanvasGradebookDataService, private feedbackDialog: MatDialog) {
      this.onLoad();
    }

  async onLoad(): Promise<void> {
    let response: string = await this.gradebookService.updateCourseDataTable(this.data.token, this.data.gradebook);
    this.isLoading = false;
    console.log(response);
    console.log(this.data.gradebook);
    this.feedbackDialog.open(TabFeedbackDialog, {
      width: '35%',
      data: {
        title: 'Edit Gradebook',
        message: response
      }
    });
    this.dialogRef.close();
  }
}

@Component({
  selector: 'add-new-col-dialog',
  templateUrl: 'add-new-col-dialog.html',
})
export class AddColumnDialog {

  public nameControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  public calcRuleControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public minValControl: FormControl = new FormControl('', [
    Validators.pattern('^-?[0-9]\d*(\.\d+)?$')
  ]);

  public maxValControl: FormControl = new FormControl('', [
    Validators.pattern('^-?[0-9]\d*(\.\d+)?$'),
    Validators.minLength(this.minValControl.value)
  ]);

  public csvFileUploadControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public columnTypeControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public columnDataTypeControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public addColumnForm: FormGroup = this.formBuilder.group({
    nameControl: this.nameControl,
    calcRuleControl: this.calcRuleControl,
    minValControl: this.minValControl,
    maxValControl: this.maxValControl,
    csvFileUploadControl: this.csvFileUploadControl,
    columnTypeControl: this.columnTypeControl,
    columnDataTypeControl: this.columnDataTypeControl,
  });

  public isLoading: boolean = false;
  public selectedColType: number = 0;
  public selectedDataType: number = 0;
  public selectedFile!: File;
  public columnTypes = ColumnType;
  public columnDataTypes = ColumnDataType;
  public columnTypeKeys: number[] = [];
  public columnDataTypeKeys: number[] = [];

  private fileContent: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddColumnDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddColumnDialogData,
    private gradebookService: CanvasGradebookDataService, private feedbackDialog: MatDialog,
    private formBuilder: FormBuilder) {
      Object.keys(ColumnType).filter(x => !isNaN(Number(x))).forEach(
        x => {
          if(Number(x) !== 0) {
            this.columnTypeKeys.push(Number(x));
          }
        }
      );
      Object.keys(ColumnDataType).filter(x => !isNaN(Number(x))).forEach(
        x => {
          this.columnDataTypeKeys.push(Number(x));
        }
      );
    }

    async onFormSubmit() {
      this.isLoading = true;
      this.selectedFile = this.addColumnForm.get('csvFileUploadControl')?.value as File;
      let newColReq: NewColumnRequest = {
        newColumn: {
          columnId: '',
          name: this.addColumnForm.get('nameControl')?.value,
          dataType: this.selectedDataType,
          columnType: this.selectedColType,
          relatedDataId: -1,
          calcRule: this.addColumnForm.get('calcRuleControl')?.value,
          colMaxValue: this.addColumnForm.get('maxValControl')?.value,
          colMinValue: this.addColumnForm.get('minValControl')?.value
        },
        csvFileContent: await this.selectedFile.text()
      };
      let resMessage: string = await this.gradebookService.addNewCustomColumn(this.data.encodedToken,
        this.data.courseId, newColReq);
      this.isLoading = false;
      this.feedbackDialog.open(TabFeedbackDialog, {
        width: '35%',
        data: {
          title: 'Add New Custom Column',
          message: resMessage
        }
      });
    }

    onMinValueChange(newMinValue: number) {
      this.addColumnForm.get('maxValControl')?.setValidators([
        Validators.pattern('^-?[0-9]\d*(\.\d+)?$'),
        Validators.minLength(newMinValue)
      ]);
    }

    cancelSubmit() {
      this.dialogRef.close();
    }
}
